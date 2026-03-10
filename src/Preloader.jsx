import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleLoaded = () => {
      const targetDuration = 2; // queremos que dure 3 segundos
      const realDuration = video.duration;

      // ajusta velocidad automáticamente
      video.playbackRate = realDuration / targetDuration;
    };

    video.addEventListener("loadedmetadata", handleLoaded);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.container}>
      <video
        ref={videoRef}
        src="/preload/preload.webm"
        autoPlay
        muted
        playsInline
        style={styles.video}
      />
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
};