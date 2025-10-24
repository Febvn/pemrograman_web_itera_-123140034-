// ES6+ Features Implementation
// Using const and let appropriately
const STORAGE_KEYS = {
    SCHEDULES: 'dashboard_schedules',
    TASKS: 'dashboard_tasks',
    NOTES: 'dashboard_notes'
};

// Base Data Manager Class (ES6 Class implementation)
class DataManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = this.loadData();
    }

    // Arrow function for loading data
    loadData = () => {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Arrow function for saving data
    saveData = () => {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // Arrow function for adding new item
    addItem = (item) => {
        const newItem = {
            id: Date.now().toString(),
            ...item,
            createdAt: new Date().toISOString()
        };
        this.data.push(newItem);
        this.saveData();
        return newItem;
    }

    // Arrow function for updating item
    updateItem = (id, updates) => {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updates };
            this.saveData();
            return this.data[index];
        }
        return null;
    }

    // Arrow function for deleting item
    deleteItem = (id) => {
        this.data = this.data.filter(item => item.id !== id);
        this.saveData();
    }

    // Arrow function for getting all items
    getAllItems = () => {
        return [...this.data];
    }
}

// Schedule Manager Class
class ScheduleManager extends DataManager {
    constructor() {
        super(STORAGE_KEYS.SCHEDULES);
    }

    // Arrow function for rendering schedule list
    renderScheduleList = () => {
        const scheduleList = document.getElementById('scheduleList');
        // if a query has been set on the manager instance, use it
        const query = this._lastQuery?.trim().toLowerCase() || '';
        const schedules = this.getAllItems().filter(s => {
            if (!query) return true;
            return (
                (s.subject || '').toLowerCase().includes(query) ||
                (s.location || '').toLowerCase().includes(query) ||
                (s.day || '').toLowerCase().includes(query) ||
                (s.time || '').toLowerCase().includes(query)
            );
        });

        if (schedules.length === 0) {
            scheduleList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-plus"></i>
                    <p>Belum ada jadwal kuliah</p>
                </div>
            `;
            return;
        }

        // Template literals for dynamic rendering
        scheduleList.innerHTML = schedules.map(schedule => `
            <div class="schedule-item">
                <div class="schedule-time">
                    <i class="fas fa-clock time-icon"></i>
                    <span class="schedule-day">${schedule.day || ''}</span>
                    ${schedule.day ? ' - ' : ''}
                    <span class="schedule-hour">${schedule.time || ''}</span>
                </div>
                <div class="schedule-subject">${schedule.subject}</div>
                <div class="schedule-location">${schedule.location}</div>
                <div class="action-buttons">
                    <button class="btn btn-edit fancy" onclick="scheduleManager.editItem('${schedule.id}')">
                        <div class="wrap"><p><i class="fas fa-edit"></i> Edit</p></div>
                    </button>
                    <button class="btn btn-danger fancy" onclick="scheduleManager.deleteItem('${schedule.id}')">
                        <div class="wrap"><p><i class="fas fa-trash"></i> Hapus</p></div>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Arrow function for showing add form
    showAddForm = () => {
        showModal('Tambah Jadwal Kuliah', this.getScheduleForm());
        document.getElementById('modalForm').onsubmit = (e) => {
            e.preventDefault();
            this.handleSubmit();
        };
    }

    // Arrow function for editing item
    editItem = (id) => {
        const schedule = this.data.find(item => item.id === id);
        if (schedule) {
            showModal('Edit Jadwal Kuliah', this.getScheduleForm(schedule));
            document.getElementById('modalForm').onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit(id);
            };
        }
    }

    // Arrow function for getting schedule form
    getScheduleForm = (schedule = null) => {
        return `
            <div class="form-group">
                <label for="scheduleDay">Hari:</label>
                <select id="scheduleDay" name="day" required>
                    <option value="" ${!schedule?.day ? 'selected' : ''}>Pilih hari</option>
                    <option value="Senin" ${schedule?.day === 'Senin' ? 'selected' : ''}>Senin</option>
                    <option value="Selasa" ${schedule?.day === 'Selasa' ? 'selected' : ''}>Selasa</option>
                    <option value="Rabu" ${schedule?.day === 'Rabu' ? 'selected' : ''}>Rabu</option>
                    <option value="Kamis" ${schedule?.day === 'Kamis' ? 'selected' : ''}>Kamis</option>
                    <option value="Jumat" ${schedule?.day === 'Jumat' ? 'selected' : ''}>Jumat</option>
                    <option value="Sabtu" ${schedule?.day === 'Sabtu' ? 'selected' : ''}>Sabtu</option>
                    <option value="Minggu" ${schedule?.day === 'Minggu' ? 'selected' : ''}>Minggu</option>
                </select>
            </div>
            <div class="form-group">
                <label for="scheduleTime">Waktu:</label>
                <!-- Membungkus input dengan label khusus sehingga klik di area mana pun akan membuka time picker -->
                <label class="time-input-label" for="scheduleTime">
                 
                    <input type="time" id="scheduleTime" name="time" value="${schedule?.time || ''}" required>
                </label>
            </div>
            <div class="form-group">
                <label for="scheduleSubject">Mata Kuliah:</label>
                <input type="text" id="scheduleSubject" name="subject" value="${schedule?.subject || ''}" required>
            </div>
            <div class="form-group">
                <label for="scheduleLocation">Lokasi:</label>
                <input type="text" id="scheduleLocation" name="location" value="${schedule?.location || ''}" required>
            </div>
        `;
    }

    // Arrow function for handling form submit
    handleSubmit = (id = null) => {
        const formData = new FormData(document.getElementById('modalForm'));
        const scheduleData = {
            day: formData.get('day'),
            time: formData.get('time'),
            subject: formData.get('subject'),
            location: formData.get('location')
        };

        if (id) {
            this.updateItem(id, scheduleData);
        } else {
            this.addItem(scheduleData);
        }

        this.renderScheduleList();
        this.updateStats();
        closeModal();
    }

    // Arrow function for deleting item with confirmation
    deleteItem = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            super.deleteItem(id);
            this.renderScheduleList();
            this.updateStats();
        }
    }

    // Arrow function for updating statistics
    updateStats = () => {
        statisticsManager.updateStats();
    }
}

// Task Manager Class
class TaskManager extends DataManager {
    constructor() {
        super(STORAGE_KEYS.TASKS);
    }

    // Arrow function for rendering task list
    renderTaskList = () => {
        const taskList = document.getElementById('taskList');
        const query = this._lastQuery?.trim().toLowerCase() || '';
        const tasks = this.getAllItems().filter(t => {
            if (!query) return true;
            return (
                (t.title || '').toLowerCase().includes(query) ||
                (t.description || '').toLowerCase().includes(query) ||
                (t.priority || '').toLowerCase().includes(query)
            );
        });

        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>Belum ada tugas</p>
                </div>
            `;
            return;
        }

        // Template literals for dynamic rendering
        taskList.innerHTML = tasks.map(task => `
            <div class="task-item">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="taskManager.toggleTask('${task.id}')">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                    <div class="task-priority ${task.priority || 'low'}">${this.getPriorityLabel(task.priority || 'low')}</div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-edit fancy" onclick="taskManager.editItem('${task.id}')">
                        <div class="wrap"><p><i class="fas fa-edit"></i></p></div>
                    </button>
                    <button class="btn btn-danger fancy" onclick="taskManager.deleteItem('${task.id}')">
                        <div class="wrap"><p><i class="fas fa-trash"></i></p></div>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Arrow function for toggling task completion
    toggleTask = (id) => {
        const task = this.data.find(item => item.id === id);
        if (task) {
            this.updateItem(id, { completed: !task.completed });
            this.renderTaskList();
            this.updateStats();
        }
    }

    // Arrow function for showing add form
    showAddForm = () => {
        showModal('Tambah Tugas', this.getTaskForm());
        document.getElementById('modalForm').onsubmit = (e) => {
            e.preventDefault();
            this.handleSubmit();
        };
    }

    // Arrow function for editing item
    editItem = (id) => {
        const task = this.data.find(item => item.id === id);
        if (task) {
            showModal('Edit Tugas', this.getTaskForm(task));
            document.getElementById('modalForm').onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit(id);
            };
        }
    }

    // Arrow function for getting task form
    getTaskForm = (task = null) => {
        return `
            <div class="form-group">
                <label for="taskTitle">Judul Tugas:</label>
                <input type="text" id="taskTitle" name="title" value="${task?.title || ''}" required>
            </div>
            <div class="form-group">
                <label for="taskDescription">Deskripsi:</label>
                <textarea id="taskDescription" name="description" required>${task?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="taskPriority">Prioritas:</label>
                <select id="taskPriority" name="priority">
                    <option value="low" ${task?.priority === 'low' ? 'selected' : ''}>Rendah</option>
                    <option value="medium" ${task?.priority === 'medium' ? 'selected' : ''}>Sedang</option>
                    <option value="high" ${task?.priority === 'high' ? 'selected' : ''}>Tinggi</option>
                </select>
            </div>
        `;
    }

    // Arrow function for handling form submit
    handleSubmit = (id = null) => {
        const formData = new FormData(document.getElementById('modalForm'));
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            completed: false
        };

        if (id) {
            this.updateItem(id, taskData);
        } else {
            this.addItem(taskData);
        }

        this.renderTaskList();
        this.updateStats();
        closeModal();
    }

    // Arrow function for deleting item with confirmation
    deleteItem = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            super.deleteItem(id);
            this.renderTaskList();
            this.updateStats();
        }
    }

    // Arrow function for getting priority label
    getPriorityLabel = (priority) => {
        const labels = {
            'low': 'Rendah',
            'medium': 'Sedang', 
            'high': 'Tinggi'
        };
        return labels[priority] || 'Rendah';
    }

    // Arrow function for updating statistics
    updateStats = () => {
        statisticsManager.updateStats();
    }
}

// Note Manager Class
class NoteManager extends DataManager {
    constructor() {
        super(STORAGE_KEYS.NOTES);
    }

    // Arrow function for rendering note list
    renderNoteList = () => {
        const noteList = document.getElementById('noteList');
        const query = this._lastQuery?.trim().toLowerCase() || '';
        const notes = this.getAllItems().filter(n => {
            if (!query) return true;
            return (
                (n.title || '').toLowerCase().includes(query) ||
                (n.content || '').toLowerCase().includes(query)
            );
        });

        if (notes.length === 0) {
            noteList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <p>Belum ada catatan</p>
                </div>
            `;
            return;
        }

        // Template literals for dynamic rendering
        noteList.innerHTML = notes.map(note => `
            <div class="note-item">
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div class="note-date">${new Date(note.createdAt).toLocaleDateString('id-ID')}</div>
                <div class="action-buttons">
                    <button class="btn btn-edit fancy" onclick="noteManager.editItem('${note.id}')">
                        <div class="wrap"><p><i class="fas fa-edit"></i> Edit</p></div>
                    </button>
                    <button class="btn btn-danger fancy" onclick="noteManager.deleteItem('${note.id}')">
                        <div class="wrap"><p><i class="fas fa-trash"></i> Hapus</p></div>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Arrow function for showing add form
    showAddForm = () => {
        showModal('Tambah Catatan', this.getNoteForm());
        document.getElementById('modalForm').onsubmit = (e) => {
            e.preventDefault();
            this.handleSubmit();
        };
    }

    // Arrow function for editing item
    editItem = (id) => {
        const note = this.data.find(item => item.id === id);
        if (note) {
            showModal('Edit Catatan', this.getNoteForm(note));
            document.getElementById('modalForm').onsubmit = (e) => {
                e.preventDefault();
                this.handleSubmit(id);
            };
        }
    }

    // Arrow function for getting note form
    getNoteForm = (note = null) => {
        return `
            <div class="form-group">
                <label for="noteTitle">Judul Catatan:</label>
                <input type="text" id="noteTitle" name="title" value="${note?.title || ''}" required>
            </div>
            <div class="form-group">
                <label for="noteContent">Isi Catatan:</label>
                <textarea id="noteContent" name="content" required>${note?.content || ''}</textarea>
            </div>
        `;
    }

    // Arrow function for handling form submit
    handleSubmit = (id = null) => {
        const formData = new FormData(document.getElementById('modalForm'));
        const noteData = {
            title: formData.get('title'),
            content: formData.get('content')
        };

        if (id) {
            this.updateItem(id, noteData);
        } else {
            this.addItem(noteData);
        }

        this.renderNoteList();
        this.updateStats();
        closeModal();
    }

    // Arrow function for deleting item with confirmation
    deleteItem = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            super.deleteItem(id);
            this.renderNoteList();
            this.updateStats();
        }
    }

    // Arrow function for updating statistics
    updateStats = () => {
        statisticsManager.updateStats();
    }
}

// Statistics Manager Class
class StatisticsManager {
    // Arrow function for updating statistics
    updateStats = () => {
        const totalTasks = taskManager.getAllItems().length;
        const completedTasks = taskManager.getAllItems().filter(task => task.completed).length;
        const totalNotes = noteManager.getAllItems().length;
        const totalSchedules = scheduleManager.getAllItems().length;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('totalNotes').textContent = totalNotes;
        document.getElementById('totalSchedules').textContent = totalSchedules;
    }
}

// Weather Service Class (Async/Await implementation)
class WeatherService {
    // Async function for getting weather data
    getWeatherData = async () => {
        try {
            // Simulating API call with Promise
            const weatherData = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
                        condition: 'sunny'
                    });
                }, 1000);
            });
            
            return weatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return { temperature: '--', condition: 'unknown' };
        }
    }

    // Arrow function for updating weather display
    updateWeatherDisplay = async () => {
        const weatherInfo = document.getElementById('weatherInfo');
        const weatherTemp = document.getElementById('weatherTemp');
        
        weatherInfo.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        const weather = await this.getWeatherData();
        
        const weatherIcon = weather.condition === 'sunny' ? 'fas fa-sun' : 'fas fa-cloud';
        weatherInfo.innerHTML = `<i class="${weatherIcon}"></i>`;
        weatherTemp.textContent = `${weather.temperature}°C`;
    }
}

// Time Service Class
class TimeService {
    // Arrow function for updating time display
    updateTimeDisplay = () => {
        const timeElement = document.getElementById('currentTime');
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }

    // Arrow function for starting time updates
    startTimeUpdates = () => {
        this.updateTimeDisplay();
        setInterval(this.updateTimeDisplay, 1000);
    }
}

// Modal Management
const showModal = (title, content) => {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('formContent').innerHTML = content;
    document.getElementById('modal').classList.add('show');
};

const closeModal = () => {
    document.getElementById('modal').classList.remove('show');
};

// Make functions globally available
window.showModal = showModal;
window.closeModal = closeModal;

// Initialize managers
const scheduleManager = new ScheduleManager();
const taskManager = new TaskManager();
const noteManager = new NoteManager();
const statisticsManager = new StatisticsManager();
const weatherService = new WeatherService();
const timeService = new TimeService();

// Make managers globally available
window.scheduleManager = scheduleManager;
window.taskManager = taskManager;
window.noteManager = noteManager;

// Utility: attach search inputs (placed in HTML) to their respective managers
const attachSearchInputs = () => {
    document.querySelectorAll('.search-container').forEach(container => {
        const input = container.querySelector('.search-input');
        const target = container.getAttribute('data-target');
        if (!input || !target) return;

        let manager = null;
        if (target === 'schedule') manager = scheduleManager;
        if (target === 'task') manager = taskManager;
        if (target === 'note') manager = noteManager;
        if (!manager) return;

        // Debounce typing
        let timeout = null;
        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                manager._lastQuery = e.target.value || '';
                // re-render the corresponding list
                if (target === 'schedule') manager.renderScheduleList();
                if (target === 'task') manager.renderTaskList();
                if (target === 'note') manager.renderNoteList();
                // update stats in case counts shown should reflect filter (optional)
                statisticsManager.updateStats();
            }, 180);
        });

        // clear filter when input is cleared (ensure immediate)
        input.addEventListener('search', (e) => {
            manager._lastQuery = e.target.value || '';
            if (target === 'schedule') manager.renderScheduleList();
            if (target === 'task') manager.renderTaskList();
            if (target === 'note') manager.renderNoteList();
        });
    });
};

// Initialize application
const initializeApp = async () => {
    // Render all lists
    scheduleManager.renderScheduleList();
    taskManager.renderTaskList();
    noteManager.renderNoteList();
    statisticsManager.updateStats();

    // Start time updates
    timeService.startTimeUpdates();

    // Load weather data
    await weatherService.updateWeatherDisplay();

    // Add event listeners for modal
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
    // Attach search inputs (placed in HTML) to filter lists
    attachSearchInputs();
};

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
