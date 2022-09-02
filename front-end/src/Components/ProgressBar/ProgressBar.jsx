//A simple progress bar component that takes the percent and
//sets the width of a div with a different color based on the provided percent
const ProgressBar = ({ percent }) => {
  const progressPercentage = {
    width: `${percent}%`,
  };

  return (
    <div className={`bg-gray-300 w-1/3 h-6 border-solid border rounded flex`}>
      <div
        style={progressPercentage}
        className="bg-green-400 h-full text-right"
      >
        <span className="text-white font-bold px-2 py-2">{`${percent}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
