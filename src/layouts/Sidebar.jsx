const Sidebar = ({ children }) => {
 
  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen">
      {/* {path.map((item, index) => (
        <div className="h-12 bg-gray-700 flex items-center justify-center cursor-pointer" key={index} onClick={() => navigate(item.path)}>
          <span className="text-white text-lg">{item.name}</span>
        </div>
      ))} */}
    {children}
    </div>
  );
};

export default Sidebar;
