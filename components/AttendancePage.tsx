
import React, { useState, useEffect, useCallback } from 'react';
import { ALLOWED_EMPLOYEES, WHATSAPP_NOTIFICATION_NUMBER } from '../constants';
import { Employee, AttendanceRecord, AttendanceType, LeaveRequest, LeaveType } from '../types';
import LoadingSpinner from './LoadingSpinner';
import InfoCard, { TimerIcon, CalendarPlusIcon, ListChecksIcon, CalendarCheckIcon, SparkleIcon } from './InfoCard';

const LOCAL_STORAGE_KEYS = {
  CURRENT_EMPLOYEE: 'attendance_currentEmployee',
  ATTENDANCE_RECORDS: 'attendance_records',
  LEAVE_REQUESTS: 'attendance_leaveRequests',
};

export const AttendancePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [employeeCodeInput, setEmployeeCodeInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [isSubmittingLeave, setIsSubmittingLeave] = useState<boolean>(false);

  const [lastAttendanceType, setLastAttendanceType] = useState<AttendanceType | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedEmployee = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_EMPLOYEE);
    if (storedEmployee) {
      const employee = JSON.parse(storedEmployee) as Employee;
      setCurrentEmployee(employee);
      setIsAuthenticated(true);
      loadEmployeeData(employee.code);
    }
  }, []);

  const loadEmployeeData = (empCode: string) => {
    const allRecords = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ATTENDANCE_RECORDS) || '[]') as AttendanceRecord[];
    const employeeRecords = allRecords.filter(r => r.employeeCode === empCode);
    setAttendanceRecords(employeeRecords);

    const lastRecord = employeeRecords.length > 0 ? employeeRecords[employeeRecords.length - 1] : null;
    if (lastRecord) {
        setLastAttendanceType(lastRecord.type);
    } else {
        setLastAttendanceType(null);
    }


    const allLeaveRequests = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.LEAVE_REQUESTS) || '[]') as LeaveRequest[];
    setLeaveRequests(allLeaveRequests.filter(lr => lr.employeeCode === empCode));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const employee = ALLOWED_EMPLOYEES.find(emp => emp.code === employeeCodeInput);
    if (employee) {
      setCurrentEmployee(employee);
      setIsAuthenticated(true);
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_EMPLOYEE, JSON.stringify(employee));
      loadEmployeeData(employee.code);
    } else {
      setLoginError('Kode Pegawai tidak valid atau tidak diizinkan.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentEmployee(null);
    setEmployeeCodeInput('');
    setAttendanceRecords([]);
    setLeaveRequests([]);
    setLastAttendanceType(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_EMPLOYEE);
  };

  const sendWhatsAppNotification = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NOTIFICATION_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handleAttendance = async (type: AttendanceType) => {
    if (!currentEmployee) return;
    setIsLoadingLocation(true);
    let locationData;
    let locationErrorMsg;

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });
      locationData = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    } catch (error: any) {
      locationErrorMsg = `Gagal mendapatkan lokasi: ${error.message}`;
      console.error(error);
    } finally {
      setIsLoadingLocation(false);
    }

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      employeeCode: currentEmployee.code,
      employeeName: currentEmployee.name,
      type,
      timestamp: new Date().toISOString(),
      location: locationData,
      locationError: locationErrorMsg,
    };

    const updatedRecords = [...attendanceRecords, newRecord];
    setAttendanceRecords(updatedRecords);
    setLastAttendanceType(type);


    // Store all records, not just current employee's, for simplicity in this example
    const allStoredRecords = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ATTENDANCE_RECORDS) || '[]') as AttendanceRecord[];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ATTENDANCE_RECORDS, JSON.stringify([...allStoredRecords, newRecord]));


    let waMessage = `ABSENSI DIGITAL BBA INDONESIA\n-----------------------------------\n`;
    waMessage += `Nama Pegawai: ${currentEmployee.name}\n`;
    waMessage += `Kode Pegawai: ${currentEmployee.code}\n`;
    waMessage += `Jenis Absensi: ${type}\n`;
    waMessage += `Waktu: ${new Date(newRecord.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'long' })}\n`;
    if (locationData) {
      waMessage += `Lokasi: https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}\n`;
    } else if (locationErrorMsg) {
      waMessage += `Lokasi: ${locationErrorMsg}\n`;
    } else {
      waMessage += `Lokasi: Tidak tersedia\n`;
    }
    sendWhatsAppNotification(waMessage);
  };

  const [leaveFormData, setLeaveFormData] = useState({
    type: LeaveType.CUTI,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleLeaveFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setLeaveFormData({ ...leaveFormData, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmployee || !leaveFormData.startDate || !leaveFormData.endDate || !leaveFormData.reason) {
        alert("Mohon lengkapi semua field pengajuan cuti/izin.");
        return;
    }
    setIsSubmittingLeave(true);
    const newLeaveRequest: LeaveRequest = {
      id: Date.now().toString(),
      employeeCode: currentEmployee.code,
      employeeName: currentEmployee.name,
      type: leaveFormData.type,
      startDate: leaveFormData.startDate,
      endDate: leaveFormData.endDate,
      reason: leaveFormData.reason,
      status: 'pending', // Default status
      requestTimestamp: new Date().toISOString(),
    };

    const updatedLeaveRequests = [...leaveRequests, newLeaveRequest];
    setLeaveRequests(updatedLeaveRequests);
    
    const allStoredLeaveRequests = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.LEAVE_REQUESTS) || '[]') as LeaveRequest[];
    localStorage.setItem(LOCAL_STORAGE_KEYS.LEAVE_REQUESTS, JSON.stringify([...allStoredLeaveRequests, newLeaveRequest]));

    setLeaveFormData({ type: LeaveType.CUTI, startDate: '', endDate: '', reason: '' }); // Reset form

    let waMessage = `PENGAJUAN CUTI/IZIN BBA INDONESIA\n-----------------------------------\n`;
    waMessage += `Nama Pegawai: ${currentEmployee.name}\n`;
    waMessage += `Kode Pegawai: ${currentEmployee.code}\n`;
    waMessage += `Jenis: ${newLeaveRequest.type}\n`;
    waMessage += `Tanggal Mulai: ${new Date(newLeaveRequest.startDate).toLocaleDateString('id-ID')}\n`;
    waMessage += `Tanggal Selesai: ${new Date(newLeaveRequest.endDate).toLocaleDateString('id-ID')}\n`;
    waMessage += `Alasan: ${newLeaveRequest.reason}\n`;
    waMessage += `Diajukan pada: ${new Date(newLeaveRequest.requestTimestamp).toLocaleString('id-ID')}\n`;
    sendWhatsAppNotification(waMessage);
    setIsSubmittingLeave(false);
    alert("Pengajuan cuti/izin telah dicatat dan notifikasi WhatsApp telah disiapkan.");
  };
  
  const canClockIn = lastAttendanceType === null || lastAttendanceType === AttendanceType.CLOCK_OUT;
  const canClockOut = lastAttendanceType === AttendanceType.CLOCK_IN;

  if (!isAuthenticated) {
    return (
      <div className="p-4 sm:p-6 max-w-md mx-auto">
        <InfoCard title="Login Absensi Digital" titleColorClass="text-theme-accent infocard-title-glow">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="employeeCode" className="block text-sm font-medium text-theme-text mb-1">
                Kode Pegawai:
              </label>
              <input
                type="text"
                id="employeeCode"
                value={employeeCodeInput}
                onChange={(e) => setEmployeeCodeInput(e.target.value)}
                className="form-input w-full"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button type="submit" className="w-full bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-glow-accent-strong">
              Login
            </button>
          </form>
        </InfoCard>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-theme-accent text-glow-accent">Absensi Digital - {currentEmployee?.name}</h2>
        <button onClick={handleLogout} className="text-sm bg-theme-interactive hover:bg-opacity-70 text-theme-text-muted py-1.5 px-3 rounded-md border border-theme-border hover:border-theme-accent">
          Logout
        </button>
      </div>

      <InfoCard title="Catat Kehadiran" icon={<TimerIcon />} titleColorClass="text-theme-accent infocard-title-glow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleAttendance(AttendanceType.CLOCK_IN)}
            disabled={isLoadingLocation || !canClockIn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 flex items-center justify-center space-x-2 hover:shadow-glow-accent focus:shadow-glow-accent"
          >
            {isLoadingLocation && <LoadingSpinner size="sm" color="text-white" />}
            <span>Absen Masuk</span>
          </button>
          <button
            onClick={() => handleAttendance(AttendanceType.CLOCK_OUT)}
            disabled={isLoadingLocation || !canClockOut}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 flex items-center justify-center space-x-2 hover:shadow-glow-accent focus:shadow-glow-accent"
          >
             {isLoadingLocation && <LoadingSpinner size="sm" color="text-white"/>}
            <span>Absen Pulang</span>
          </button>
        </div>
        {isLoadingLocation && <p className="text-xs text-theme-text-muted mt-2 text-center">Mencari lokasi Anda...</p>}
      </InfoCard>

      <InfoCard title="Pengajuan Cuti/Izin" icon={<CalendarPlusIcon />} titleColorClass="text-theme-accent infocard-title-glow">
        <form onSubmit={handleLeaveSubmit} className="space-y-3">
          <div>
            <label htmlFor="leaveType" className="block text-xs font-medium text-theme-text-muted mb-1">Jenis:</label>
            <select name="type" id="leaveType" value={leaveFormData.type} onChange={handleLeaveFormChange} className="form-select w-full">
              <option value={LeaveType.CUTI}>Cuti</option>
              <option value={LeaveType.IZIN}>Izin</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="startDate" className="block text-xs font-medium text-theme-text-muted mb-1">Tanggal Mulai:</label>
              <input type="date" name="startDate" id="startDate" value={leaveFormData.startDate} onChange={handleLeaveFormChange} className="form-input w-full" required />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-xs font-medium text-theme-text-muted mb-1">Tanggal Selesai:</label>
              <input type="date" name="endDate" id="endDate" value={leaveFormData.endDate} onChange={handleLeaveFormChange} className="form-input w-full" required />
            </div>
          </div>
          <div>
            <label htmlFor="reason" className="block text-xs font-medium text-theme-text-muted mb-1">Alasan:</label>
            <textarea name="reason" id="reason" value={leaveFormData.reason} onChange={handleLeaveFormChange} className="form-textarea w-full" rows={3} required />
          </div>
          <button type="submit" disabled={isSubmittingLeave} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 flex items-center justify-center hover:shadow-glow-accent focus:shadow-glow-accent">
            {isSubmittingLeave && <LoadingSpinner size="sm" color="text-white"/>}
            Ajukan
          </button>
        </form>
      </InfoCard>

      <InfoCard title="Riwayat Kehadiran Anda" icon={<ListChecksIcon />} titleColorClass="text-theme-accent infocard-title-glow">
        {attendanceRecords.length === 0 ? (
          <p className="text-theme-text-muted text-center">Belum ada riwayat kehadiran.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-theme-accent scrollbar-track-theme-interactive">
            {attendanceRecords.slice().reverse().map(record => (
              <li key={record.id} className="p-2 bg-theme-bg rounded-md border border-theme-border text-xs">
                <p><strong>{record.type}</strong> - {new Date(record.timestamp).toLocaleString('id-ID', {dateStyle: 'short', timeStyle: 'medium'})}</p>
                {record.location && <p>Lokasi: {record.location.latitude.toFixed(5)}, {record.location.longitude.toFixed(5)}</p>}
                {record.locationError && <p className="text-orange-400">Lokasi: {record.locationError}</p>}
              </li>
            ))}
          </ul>
        )}
      </InfoCard>

      <InfoCard title="Riwayat Pengajuan Cuti/Izin Anda" icon={<CalendarCheckIcon />} titleColorClass="text-theme-accent infocard-title-glow">
         {leaveRequests.length === 0 ? (
          <p className="text-theme-text-muted text-center">Belum ada riwayat pengajuan.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-theme-accent scrollbar-track-theme-interactive">
            {leaveRequests.slice().reverse().map(req => (
              <li key={req.id} className="p-2 bg-theme-bg rounded-md border border-theme-border text-xs">
                <p><strong>{req.type}</strong>: {new Date(req.startDate).toLocaleDateString('id-ID')} - {new Date(req.endDate).toLocaleDateString('id-ID')}</p>
                <p>Alasan: {req.reason}</p>
                <p>Status: <span className={`font-semibold ${req.status === 'pending' ? 'text-yellow-400' : req.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>{req.status}</span> (Frontend)</p>
              </li>
            ))}
          </ul>
        )}
      </InfoCard>
      
       <InfoCard title="Fitur Tambahan (Segera Hadir)" icon={<SparkleIcon />} titleColorClass="text-theme-accent infocard-title-glow">
        <p className="text-theme-text-muted text-center text-sm">
          Laporan Kehadiran Detail, Pengaturan Jadwal, Pengajuan Lembur, dan fitur lainnya akan segera tersedia untuk meningkatkan pengalaman manajemen absensi Anda.
        </p>
      </InfoCard>
    </div>
  );
};
