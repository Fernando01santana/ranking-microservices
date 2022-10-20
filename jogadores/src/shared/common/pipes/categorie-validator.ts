import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isEmpty } from "src/utils/isEmpty";

export class CategorieValidateParameterPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        
        if(!value.match(/^[0-9a-fA-F]{24}$/) || !isEmpty(value)){
            throw new BadRequestException("Id informado invalido ou vazio");
        }
    }
}