import ListProps from "./interface";

function WorkerList({ workers } : ListProps) {
  return (
    <>
    {
      workers.map(worker => {
        return (
          <div className={`flex items-center border-b-2 border-gray-100`}>
          <img className="mx-2 mb-2 w-8 h-8" src='../images/man.png' />
          <p className="ml-2 text-base font-bold ">{worker.name}</p>
        </div>
        )
      })
    }
    </>
  );
}

export default WorkerList;
