import { Logger } from "@nestjs/common";

export class KeyDuplicateException{
  ackErros:string[] = ['E11000']

    private logger:Logger
    verify(error,channel,message){
        this.ackErros.forEach(async element => {
          if (error.message.includes(element)) {
                await channel.ack(message)
              }
        });
    }
}