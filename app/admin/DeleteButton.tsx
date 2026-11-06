"use client";
export default function DeleteButton() {
  return (
    <button type="submit" onClick={(e) => { if (!confirm("حذف هذه الرسالة نهائياً؟")) e.preventDefault(); }}
      className="rounded-lg border border-red-500/40 px-3 py-1.5 text-sm text-red-300 transition-colors hover:bg-red-500/10">حذف</button>
  );
}
