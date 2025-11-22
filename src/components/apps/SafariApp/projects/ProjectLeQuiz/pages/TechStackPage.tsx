import { Smartphone, Globe, Database } from "lucide-react";

export const TechStackPage = () => {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">Tech Stack</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-border bg-card p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Web Platform</h3>
                                <p className="text-sm text-muted-foreground">
                                    Remix.js Framework
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Built with Remix.js for a modern, full-stack web experience
                            with server-side rendering and optimal performance.
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Smartphone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Mobile Platform</h3>
                                <p className="text-sm text-muted-foreground">
                                    React Native
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Native mobile application developed with React Native for iOS
                            and Android platforms.
                        </p>
                    </div>

                    {/* Database & API */}
                    <div className="rounded-lg border border-border bg-card p-6 md:col-span-2">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Database className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    Database & API Integration
                                </h3>
                                <p className="text-sm text-muted-foreground">GraphQL</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Unified GraphQL API enables seamless data synchronization
                            across web and mobile platforms, ensuring consistent data
                            access and real-time updates for both students and teachers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

