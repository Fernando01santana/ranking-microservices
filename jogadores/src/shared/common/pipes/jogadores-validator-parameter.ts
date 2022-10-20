import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import AppError from "src/shared/error/AppError";
import { isEmpty } from "src/utils/isEmpty";

export class JogadoresValidacaoParametrosPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value.match(/^[0-9a-fA-F]{24}$/) || !isEmpty(value)){
            throw new BadRequestException("Id informado invalido ou vazio");
        }
        return;
    }
}