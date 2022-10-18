const ComboEditHeader = () => {
  return (
    <div className="flex w-full justify-center space-x-2 bg-header py-2">
      <h2 className="text-4xl text-[#F1F5F9]">Name</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="max-w-[3rem] cursor-pointer fill-[#F1F5F9]"
      >
        <path d="m39.7 14.7-6.4-6.4 2.1-2.1q.85-.85 2.125-.825 1.275.025 2.125.875L41.8 8.4q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Z" />
      </svg>
    </div>
  );
};

export default ComboEditHeader;
