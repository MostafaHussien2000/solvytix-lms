import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Trainer } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="w-12 h-12 rounded-full flex justify-center items-center bg-muted-foreground">
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
  );
}

export default TrainerCard;
