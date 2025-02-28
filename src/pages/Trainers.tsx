import { useTrainers } from "@/api/TrainerService";
import AddTrainerForm from "@/components/forms/AddTrainerForm";
import { Button } from "@/components/ui/button";
import TrainerCard from "@/components/ui/trainer-card";
import { Plus } from "lucide-react";
import { useState } from "react";

function Trainers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { getAll } = useTrainers();
  const { data: trainers, isPending } = getAll();
  return (
    <div className="space-y-6 animate-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Trainers</h1>

        <Button variant="default" onClick={() => setShowAddForm(true)}>
          <Plus /> Add Trainer
        </Button>

        <AddTrainerForm
          open={showAddForm}
          onClose={() => setShowAddForm(false)}
        />
      </div>
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
