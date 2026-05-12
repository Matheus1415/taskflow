export default function TaskHomePage() {
    return (
        <div className="flex flex-col gap-8 px-6">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        My Tasks
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Gerencie suas tarefas, acompanhe prioridades e mantenha sua
                        produtividade em dia.
                    </p>
                </div>
            </section>
        </div>
    );
}
