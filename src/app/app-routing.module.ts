import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./about/about.module").then(m => m.AboutModule),
  },
  {
    path: "settings",
    loadChildren: () => import("./settings/settings.module").then(m => m.SettingsModule),
  },
  {
    path: "new",
    loadChildren: () => import("./new/new.module").then(m => m.NewModule),
  },
  {
    path: ":id",
    loadChildren: () => import("./room/room.module").then(m => m.RoomModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
