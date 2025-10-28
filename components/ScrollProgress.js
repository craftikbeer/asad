function ScrollProgress() {
  try {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const updateProgress = () => {
        const scrolled = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / height) * 100;
        setProgress(scrollPercent);
      };

      window.addEventListener('scroll', updateProgress);
      return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
      <div 
        id="scroll-progress" 
        style={{ width: `${progress}%` }}
        data-name="scroll-progress" 
        data-file="components/ScrollProgress.js"
      />
    );
  } catch (error) {
    console.error('ScrollProgress error:', error);
    return null;
  }
}