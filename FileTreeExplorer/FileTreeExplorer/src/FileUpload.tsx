import { useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (content: string) => void; // Callback to handle file content
}

function FileUploader({ onFileSelect }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Opens file explorer
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileSelect(content); // Pass content to parent
      };
      reader.readAsText(file); // Assumes text file; adjust for other types
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>Click here to upload your file.</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hidden input
        accept=".json" // Optional: restrict to JSON files
      />
    </>
  );
}

export default FileUploader;