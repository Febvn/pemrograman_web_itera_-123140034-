  // Theme toggle: default = night. Persist preference in localStorage.
  (function(){
    const THEME_KEY = 'tm_theme'; // 'light' or 'dark'
    const body = document.body;
    const switchEl = document.querySelector('.theme-switch__checkbox');

    function applyTheme(theme){
      // 'dark' = night (moon), 'light' = day
      if(theme === 'light') body.classList.add('light-theme'); else body.classList.remove('light-theme');
      // checkbox checked => show moon/night (CSS expects checked to show night)
      if(switchEl) switchEl.checked = (theme === 'dark');
    }

    // read saved preference
    try{
      const saved = localStorage.getItem(THEME_KEY);
      if(saved) applyTheme(saved);
      else {
        // default to dark/night
        applyTheme('dark');
        localStorage.setItem(THEME_KEY, 'dark');
      }
    }catch(e){ console.warn('Could not access localStorage for theme', e); applyTheme('dark'); }

    if(switchEl){
      switchEl.addEventListener('change', function(){
        // when checked -> dark (moon), unchecked -> light
        const newTheme = this.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        try{ localStorage.setItem(THEME_KEY, newTheme); }catch(e){/* ignore */}
      });
    }
  })();

  // (moved) magnifier icon click support is attached below after searchInput is defined
// Task Manager Mahasiswa - app logic
(function(){
  const STORAGE_KEY = 'tasks';
  const taskForm = document.getElementById('task-form');
  const taskListEl = document.getElementById('task-list');
  const nameInput = document.getElementById('task-name');
  const courseInput = document.getElementById('task-course');
  const deadlineInput = document.getElementById('task-deadline');
  const taskIdInput = document.getElementById('task-id');
  const formError = document.getElementById('form-error');
  const resetBtn = document.getElementById('reset-btn');
  const searchInput = document.getElementById('search-input');
  const courseFilter = document.getElementById('course-filter');
  const statusFilter = document.getElementById('status-filter');
  const pendingCount = document.getElementById('pending-count');

  let tasks = [];

  // Utility: save to localStorage
  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // Utility: load from localStorage
  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      tasks = raw ? JSON.parse(raw) : [];
    }catch(e){
      console.error('Gagal mem-parsing tasks dari localStorage', e);
      tasks = [];
    }
  }

  // Generate ID
  function uid(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  }

  // Validate form
  function validateForm(){
    formError.textContent = '';
    const name = nameInput.value.trim();
    if(!name){ formError.textContent = 'Nama tugas tidak boleh kosong.'; return false; }
    const dl = deadlineInput.value;
    if(dl){
      const d = new Date(dl + 'T23:59:59');
      if(isNaN(d.getTime())){ formError.textContent = 'Deadline tidak valid.'; return false; }
    }
    return true;
  }

  // Add or update task
  function upsertTask(e){
    e.preventDefault();
    if(!validateForm()) return;
    const id = taskIdInput.value;
    const payload = {
      name: nameInput.value.trim(),
      course: courseInput.value.trim(),
      deadline: deadlineInput.value || null,
    };
    if(id){
      const idx = tasks.findIndex(t=>t.id===id);
      if(idx>-1){
        tasks[idx] = {...tasks[idx], ...payload};
      }
    }else{
      tasks.push({ id: uid(), ...payload, done: false, createdAt: new Date().toISOString() });
    }
    save(); render(); taskForm.reset(); taskIdInput.value='';
  }

  // Render course filter options
  function renderCourseFilter(){
    const courses = Array.from(new Set(tasks.map(t=>t.course).filter(Boolean))).sort();
    // clear
    while(courseFilter.options.length>1) courseFilter.remove(1);
    courses.forEach(c=>{
      const opt = document.createElement('option'); opt.value=c; opt.textContent=c; courseFilter.appendChild(opt);
    });
  }

  // Toggle done
  function toggleDone(id){
    const idx = tasks.findIndex(t=>t.id===id); if(idx===-1) return;
    tasks[idx].done = !tasks[idx].done; save(); render();
  }

  // Delete
  function deleteTask(id){
    if(!confirm('Hapus tugas ini?')) return;
    tasks = tasks.filter(t=>t.id!==id); save(); render();
  }

  // Edit: populate form
  function editTask(id){
    const t = tasks.find(x=>x.id===id); if(!t) return;
    taskIdInput.value = t.id; nameInput.value = t.name; courseInput.value = t.course || ''; deadlineInput.value = t.deadline || '';
    window.scrollTo({top:0,behavior:'smooth'});
  }

  // Search & filter
  function getFiltered(){
    const q = searchInput.value.trim().toLowerCase();
    const course = courseFilter.value;
    const status = statusFilter.value;
    return tasks.filter(t=>{
      if(course && t.course!==course) return false;
      if(status==='pending' && t.done) return false;
      if(status==='done' && !t.done) return false;
      if(q){
        return (t.name || '').toLowerCase().includes(q) || (t.course||'').toLowerCase().includes(q);
      }
      return true;
    }).sort((a,b)=>{
      // incomplete first, then by deadline
      if(a.done!==b.done) return a.done?1:-1;
      if(a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
      if(a.deadline) return -1; if(b.deadline) return 1; return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  // Render list
  function render(){
    renderCourseFilter();
    const items = getFiltered();
    taskListEl.innerHTML = '';
    items.forEach(t=>{
      const li = document.createElement('li'); li.className='task-item '+(t.done?'task-done':'');
      const meta = document.createElement('div'); meta.className='task-meta';
      const title = document.createElement('div'); title.className='task-title'; title.textContent = t.name;
      const sub = document.createElement('div'); sub.className='task-course';
      sub.textContent = [t.course, t.deadline ? '• '+formatDate(t.deadline): null].filter(Boolean).join(' ');
      meta.appendChild(title); meta.appendChild(sub);
      const actions = document.createElement('div'); actions.className='task-actions';

  const toggle = document.createElement('button'); toggle.className='icon toggle'; toggle.title='Toggle selesai'; toggle.setAttribute('aria-label', t.done ? 'Tandai belum selesai' : 'Tandai selesai'); toggle.innerHTML = t.done ? '⟲' : '✔';
  toggle.addEventListener('click', ()=>toggleDone(t.id));
  const edit = document.createElement('button'); edit.className='icon edit'; edit.title='Edit'; edit.setAttribute('aria-label', 'Edit tugas: '+t.name); edit.innerHTML='✎'; edit.addEventListener('click', ()=>editTask(t.id));
  const del = document.createElement('button'); del.className='icon delete'; del.title='Hapus'; del.setAttribute('aria-label', 'Hapus tugas: '+t.name); del.innerHTML='✖'; del.addEventListener('click', ()=>deleteTask(t.id));

      actions.appendChild(toggle); actions.appendChild(edit); actions.appendChild(del);
      li.appendChild(meta); li.appendChild(actions);
      taskListEl.appendChild(li);
    });

    // pending count
    const pending = tasks.filter(t=>!t.done).length; pendingCount.textContent = pending;
  }

  function formatDate(d){
    const dt = new Date(d);
    if(isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString();
  }

  // Reset form
  resetBtn.addEventListener('click', ()=>{ taskForm.reset(); taskIdInput.value=''; formError.textContent=''; });

  // Attach events
  taskForm.addEventListener('submit', upsertTask);
  searchInput.addEventListener('input', render);
  courseFilter.addEventListener('change', render);
  statusFilter.addEventListener('change', render);

  // Magnifier icon: focus the search input and trigger render (also support Enter/Space)
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', function() {
      searchInput.focus();
      render();
    });
    searchIcon.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault(); searchInput.focus(); render();
      }
    });
  }

  // Initialize
  load(); render();

  // Export for debug (optional)
  window.__tm = { tasks, save, load };
})();
