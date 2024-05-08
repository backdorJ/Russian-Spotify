import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import https from "node:https";
import {UserInteractionController} from "./controllers/userInteraction.controller";

@Module({
    controllers: [UserInteractionController],
    imports: [
        HttpModule.register({
            httpAgent: new https.Agent({rejectUnauthorized: false}),
        }),
    ],
    providers: []
})

export class DatabaseInteractionModule {
}
