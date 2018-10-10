namespace paper {
    /**
     * Late 更新系统。
     */
    export class LateUpdateSystem extends BaseSystem {
        protected readonly _interests = [
            { componentClass: Behaviour as any, type: InterestType.Extends | InterestType.Unessential, isBehaviour: true }
        ];
        private readonly _laterCalls: (() => void)[] = [];

        public onUpdate(deltaTime: number) {
            // Update behaviours.
            const components = this._groups[0].components as ReadonlyArray<Behaviour | null>;

            if (Application.playerMode === PlayerMode.Editor) {
                for (const component of components) {
                    if (component && (component.constructor as IComponentClass<Behaviour>).executeInEditMode) {
                        component.onLateUpdate && component.onLateUpdate(deltaTime);
                    }
                }
            }
            else {
                for (const component of components) {
                    if (component) {
                        component.onLateUpdate && component.onLateUpdate(deltaTime);
                    }
                }
            }
            //
            egret.ticker.update(); // TODO 帧频
            //
            if (this._laterCalls.length > 0) {
                for (const callback of this._laterCalls) {
                    callback();
                }

                this._laterCalls.length = 0;
            }
        }
        /**
         * 在 `paper.Behaviour.onLateUpdate()` 生命周期之后回调指定方法。
         * @param callback 需要回调的方法。
         */
        public callLater(callback: () => void): void {
            this._laterCalls.push(callback);
        }
    }
}
