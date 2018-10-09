namespace egret3d {
    /**
     * @internal
     */
    export class CameraAndLightSystem extends paper.BaseSystem {
        protected readonly _interests = [
            [
                { componentClass: Camera }
            ],
            [
                { componentClass: [DirectionalLight, PointLight, SpotLight] }
            ]
        ];
        protected readonly _camerasAndLights: CameraAndLightCollecter = paper.GameObject.globalGameObject.getOrAddComponent(CameraAndLightCollecter);
        protected readonly _drawCallCollecter: DrawCallCollecter = paper.GameObject.globalGameObject.getOrAddComponent(DrawCallCollecter);

        public onAddGameObject(_gameObject: paper.GameObject, group: paper.GameObjectGroup) {
            if (group === this._groups[0]) {
                this._camerasAndLights.updateCameras(this._groups[0].gameObjects);
            }
            else if (group === this._groups[1]) {
                this._camerasAndLights.updateLights(this._groups[1].gameObjects);
            }
        }

        public onRemoveGameObject(_gameObject: paper.GameObject, group: paper.GameObjectGroup) {
            if (group === this._groups[0]) {
                this._camerasAndLights.updateCameras(this._groups[0].gameObjects);
            }
            else if (group === this._groups[1]) {
                this._camerasAndLights.updateLights(this._groups[1].gameObjects);
            }
        }

        public onUpdate(deltaTime: number) {
            const cameras = this._camerasAndLights.cameras;
            if (cameras.length > 0) {
                this._camerasAndLights.sortCameras();

                for (const component of cameras) {
                    component._update(deltaTime);
                }
            }

            this._drawCallCollecter._update();
        }
    }
}