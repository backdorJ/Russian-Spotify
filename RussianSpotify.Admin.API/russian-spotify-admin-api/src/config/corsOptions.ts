import {allowedOrigins} from "./allowedOrigins";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
    optionsSuccessStatus: 200
}
