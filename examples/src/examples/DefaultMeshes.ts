namespace DefaultMeshes {
    export async function start() {
        // Load resource config.
        await RES.loadConfig("resource/default.res.json", "resource/");
        // Create camera.
        egret3d.Camera.main;

        //
        const gameObject = paper.GameObject.create();
        const meshFilter = gameObject.addComponent(egret3d.MeshFilter);
        const meshRenderer = gameObject.addComponent(egret3d.MeshRenderer);
        meshFilter.mesh = egret3d.DefaultMeshes.CUBE;
        meshRenderer.material = egret3d.Material.create();

        // GUI.
        const guiComponent = paper.GameObject.globalGameObject.getOrAddComponent(paper.editor.GUIComponent);
        const options = {
            mesh: "CUBE",
            texture: false,
        };
        const gui = guiComponent.hierarchy.addFolder("DefaultMeshes");
        gui.open();
        gui.add(options, "mesh", [
            "QUAD",
            "QUAD_PARTICLE",
            "PLANE",
            "CUBE",
            "PYRAMID",
            "CONE",
            "CYLINDER",
            "TORUS",
            "SPHERE",
        ]).onChange((v: string) => {
            meshFilter.mesh = egret3d.DefaultMeshes[v];
        });
        gui.add(options, "texture").onChange(async (v: boolean) => {
            if (v) {
                meshRenderer.material.setTexture(await RES.getResAsync("logo.png"));
            }
            else {
                meshRenderer.material.setTexture(null);
            }
        });
    }
}