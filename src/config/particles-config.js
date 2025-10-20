const particlesConfig = {
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "grab",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            grab: {
                distance: 150,
                links: {
                    opacity: 0.8,
                    color: "#ff00ff"
                }
            }
        },
    },
    particles: {
        color: {
            value: "#00ffff",
        },
        links: {
            color: "#ff00ff", // Magenta links
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 100,
        },
        opacity: {
            value: 0.7,
        },
        shape: {
            type: ["circle", "triangle"],
        },
        size: {
            value: { min: 1, max: 4 },
        },
    },
    detectRetina: true,
};

export default particlesConfig;
