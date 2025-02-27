import { useTrainers } from "@/api/TrainerService";
import TrainerCard from "@/components/ui/trainer-card";

function Trainers() {
  const { getAll } = useTrainers();
  const { data: trainers, isPending } = getAll();
  return (
    <div className="space-y-6 animate-in">
      <h1 className="text-3xl font-bold tracking-tight">Trainers</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <p>Loading ....</p>
        ) : (
          trainers?.map((trainer) => (
            <TrainerCard trainer={trainer} key={trainer.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Trainers;
