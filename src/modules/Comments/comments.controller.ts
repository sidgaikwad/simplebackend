import { Controller, Post } from "@nestjs/common";
import { CommentService } from "./comments.service";

@Controller('commentSection')

export class CommentModule{
    constructor( private commentService: CommentService) {}

    @Post('comment'){
        
    }
}