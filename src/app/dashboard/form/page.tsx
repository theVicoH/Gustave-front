"use client";

export default function FormPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Form</h1>
      </div>

      <div className="w-full h-[80vh]">
        <iframe
          src="https://forms.fillout.com/t/eii5XhE7g7us"
          className="w-full h-full border-0 rounded-lg"
          allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        />
      </div>
    </div>
  );
}
