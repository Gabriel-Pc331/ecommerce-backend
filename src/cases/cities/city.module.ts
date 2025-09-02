import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityService } from "./services/city.service";
import { CityController } from "./controllers/city.controller";
import { State } from "./entities/state.entity";
import { City } from "./entities/city.entity";
import { StateController } from "./controllers/state.controller";
import { StateService } from "./services/state.service";

@Module({
    imports: [TypeOrmModule.forFeature([State, City])],
    providers: [StateService, CityService],
    controllers: [StateController, CityController]
})
export class CityModule { }