//draw everything that is part of the scenery

export function drawEnvironment(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const gradient = context.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradient.addColorStop(0, "#56beee");
    gradient.addColorStop(0.3, "#2fa7db");
    gradient.addColorStop(0.9, "#0b5f8a");

    context.fillStyle = gradient;
    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    context.fillRect(0, 0, canvas.width, canvas.height);

    const seabedHeight = 60;

    context.fillStyle = "#D8C28A";
    context.fillRect(
        0, canvas.height - seabedHeight, canvas.width, seabedHeight
    );
};