const ReportTableHeader = () => {
  return (
    <div className="grid grid-cols-7 font-semibold text-textColor py-4 px-5 text-[12px]">
      <h1 className="col-span-1">Name</h1>
      <h1 className="col-span-1">Time</h1>
      <h1 className="col-span-1">Subject</h1>
      <h1 className="col-span-2">Description</h1>
      <h1 className="col-span-1">Status</h1>
      <h1 className="col-span-1">Action</h1>
    </div>
  );
};

export default ReportTableHeader;
