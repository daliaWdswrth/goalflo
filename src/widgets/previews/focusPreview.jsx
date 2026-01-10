
export const FocusPreview = ({ data, theme }) => {
  if (!data.focus) {
    return <div className="text-gray-400 text-sm italic">set your focus</div>;
  }

  return (
    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50'} border-l-2 border-cyan-400`}>
      <p className="text-sm line-clamp-3 leading-relaxed break-words">{data.focus}</p>
    </div>
  );
};