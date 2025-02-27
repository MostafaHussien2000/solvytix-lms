import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Trainer } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Link to={`/trainers/${trainer.id}`}>
      <Card className="overflow-hidden cursor-pointer transition-colors duration-300 ease-in-out border-2 hover:border-primary">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground overflow-hidden">
              <AvatarImage src={trainer.image} />
              <AvatarFallback>
                {trainer.name.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{trainer.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm text-muted-foreground">{trainer.bio}</p>
          </div>
          <div className="mt-4">
            <p className="font-medium">Hourly Rate: ${trainer.hourlyRate}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default TrainerCard;
