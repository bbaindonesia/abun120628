
import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';

const KAABA_LAT = 21.422487;
const KAABA_LON = 39.826206;

const QiblaFinderWidget: React.FC = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  const requestPermissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Geolocation
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });
      setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      setPermissionStatus('granted'); // At least location is granted

      // Device Orientation
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const orientationPermission = await (DeviceOrientationEvent as any).requestPermission();
        if (orientationPermission !== 'granted') {
          throw new Error('Izin orientasi perangkat ditolak. Kompas tidak akan berfungsi optimal.');
        }
      }
      // If no requestPermission function, assume it's a non-iOS 13+ browser or permission already handled.
      // The event listener will then try to attach.
      
    } catch (err: any) {
      console.error("Permission error:", err);
      let errMsg = "Terjadi kesalahan. ";
      if (err.code === 1) errMsg = "Izin lokasi ditolak. Fitur ini memerlukan akses lokasi.";
      else if (err.code === 2) errMsg = "Posisi tidak tersedia. Pastikan GPS aktif.";
      else if (err.code === 3) errMsg = "Waktu habis saat mencari lokasi.";
      else if (err.message.includes('Izin orientasi')) errMsg = err.message;
      else errMsg = "Tidak dapat mengakses sensor perangkat.";
      
      setError(errMsg);
      setPermissionStatus('denied');
    } finally {
      setIsLoading(false); // Should be set regardless of orientation permission outcome if location succeeded or failed.
    }
  }, []);

  useEffect(() => {
    if (permissionStatus === 'prompt') {
      // Optionally, show a button to trigger permission request for iOS compatibility
      // For now, auto-request on component mount for simplicity unless it's strictly iOS
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function' && navigator.userAgent.includes("Mobile")) {
         // Do nothing, wait for user interaction to call requestPermissions
      } else {
        requestPermissions();
      }
    }
  }, [permissionStatus, requestPermissions]);
  

  useEffect(() => {
    if (userLocation) {
      const latK = KAABA_LAT * Math.PI / 180;
      const lonK = KAABA_LON * Math.PI / 180;
      const latU = userLocation.lat * Math.PI / 180;
      const lonU = userLocation.lon * Math.PI / 180;

      const y = Math.sin(lonK - lonU);
      const x = Math.cos(latU) * Math.tan(latK) - Math.sin(latU) * Math.cos(lonK - lonU);
      let angleRad = Math.atan2(y, x);
      let angleDeg = (angleRad * 180 / Math.PI + 360) % 360;
      setQiblaDirection(angleDeg);
      setIsLoading(false); // Qibla calculated
    }
  }, [userLocation]);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading: number | null = null;
      // Use 'any' to access webkitCompassHeading, as it's not a standard property
      const webkitHeading = (event as any).webkitCompassHeading;

      if (typeof webkitHeading === 'number') { // For iOS
        heading = webkitHeading;
      } else if (event.absolute && event.alpha !== null) { // Standard, ensure it's absolute
        heading = (360 - event.alpha) % 360; // Alpha is direction from North, clockwise. We often want 0=North.
      }
      // If event.alpha is null or not absolute, it might be less reliable or relative.
      // No simple fallback here other than not setting deviceHeading.
      
      if (heading !== null) {
        setDeviceHeading(heading);
      } else if (!error && permissionStatus === 'granted') { // Only set error if not already an error and permissions seemed okay
        // setError("Data kompas tidak tersedia atau tidak akurat dari perangkat Anda. Coba kalibrasi kompas atau pindah ke area terbuka.");
      }
    };

    if (permissionStatus === 'granted' || typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true); // Fallback if absolute isn't supported
      return () => {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    }
  }, [permissionStatus, error]); // Re-attach listener if permission status changes


  const compassRotation = deviceHeading !== null ? -deviceHeading : 0;
  const qiblaPointerRotation = (qiblaDirection !== null && deviceHeading !== null) ? (qiblaDirection - deviceHeading + 360) % 360 : null;

  const renderContent = () => {
    if (permissionStatus === 'prompt' && typeof (DeviceOrientationEvent as any).requestPermission === 'function' && navigator.userAgent.includes("Mobile")) {
      return (
        <div className="p-4 text-center">
          <p className="text-theme-text-muted mb-3">Fitur ini memerlukan izin akses lokasi dan sensor orientasi perangkat Anda.</p>
          <button
            onClick={requestPermissions}
            className="bg-theme-accent hover:bg-theme-accent-hover text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-glow-accent-strong"
          >
            Izinkan Akses Sensor
          </button>
        </div>
      );
    }
    
    if (isLoading) {
      return <div className="p-4 text-center"><LoadingSpinner text="Mempersiapkan sensor..." /></div>;
    }
    if (error) {
      return <p className="text-red-400 text-sm p-4 text-center bg-theme-interactive/30 rounded-md">{error}</p>;
    }
    if (qiblaDirection === null || deviceHeading === null) {
      return (
        <div className="p-4 text-center">
           <LoadingSpinner text="Menunggu data sensor..." />
           <p className="text-xs text-theme-text-muted mt-2">Pastikan GPS aktif dan Anda berada di area terbuka. Kalibrasi kompas perangkat Anda jika perlu (gerakkan membentuk angka 8).</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-3 p-2">
        <div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-theme-accent shadow-hologram-intense bg-theme-widget-bg flex items-center justify-center"
            aria-label="Kompas Arah Kiblat"
        >
          {/* Compass Rose */}
          <div 
            className="absolute w-full h-full transition-transform duration-100 ease-linear"
            style={{ transform: `rotate(${compassRotation}deg)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-theme-text font-semibold text-sm">U</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-theme-text-muted text-xs">S</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-theme-text-muted text-xs">B</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-theme-text-muted text-xs">T</div>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <div key={deg} className="absolute w-0.5 h-2 bg-theme-text-muted top-0 left-1/2 -translate-x-1/2" style={{ transform: `rotate(${deg}deg)`, transformOrigin: 'bottom center', height: deg % 90 === 0 ? '8px' : '5px', top:'2px' }}></div>
            ))}
          </div>

          {/* Qibla Pointer */}
          {qiblaPointerRotation !== null && (
            <div 
              className="absolute w-3 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-full transition-transform duration-100 ease-linear" 
              style={{ transform: `rotate(${qiblaPointerRotation}deg)`, transformOrigin: 'bottom center' }}
              title={`Arah Kiblat: ${qiblaDirection.toFixed(1)}°`}
            >
              <svg viewBox="0 0 24 100" fill="currentColor" className="text-green-400 filter drop-shadow-[0_0_6px_#34D399]">
                <polygon points="12,0 20,25 12,20 4,25" /> 
                <rect x="10" y="20" width="4" height="80" rx="1"/>
              </svg>
               <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold">K</span>
            </div>
          )}
           {/* Center dot */}
           <div className="w-2 h-2 bg-theme-accent rounded-full z-10"></div>
        </div>
        
        <div className="text-center text-xs space-y-1">
          <p className="text-theme-text">Arah Kiblat: <strong className="text-theme-accent text-glow-accent">{qiblaDirection.toFixed(1)}°</strong> dari Utara</p>
          <p className="text-theme-text-muted">Arah Perangkat (Utara): <strong className="text-theme-text">{deviceHeading.toFixed(1)}°</strong></p>
          {userLocation && <p className="text-theme-text-muted opacity-80">Lokasi: {userLocation.lat.toFixed(3)}, {userLocation.lon.toFixed(3)}</p>}
        </div>
         <p className="text-xs text-theme-text-muted opacity-80 mt-3 p-2 border border-dashed border-[var(--color-theme-widget-border-hologram)]/50 rounded-md leading-relaxed bg-theme-widget-bg shadow-hologram-soft">
            <strong>Penting:</strong> Akurasi tergantung sensor perangkat dan kondisi lingkungan. Jauhkan dari benda logam/magnetik. Untuk kalibrasi, gerakkan perangkat membentuk angka 8. Hasil terbaik di area terbuka.
          </p>
      </div>
    );
  };
  
  return (
    <div className="text-sm">
      {renderContent()}
    </div>
  );
};

export default QiblaFinderWidget;
