import { Lock, Mail, ArrowRight, ShieldCheck, Fingerprint, Sparkles, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext/hook";
import { Link, useNavigate } from "react-router";
import { toast } from "@/utils/notifications";

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "O e-mail é obrigatório.",
        })
        .email("Informe um e-mail válido."),

    password: z
        .string({
            required_error: "A senha é obrigatória.",
        })
        .min(6, {
            message: "A senha deve ter pelo menos 6 caracteres.",
        }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {

    const { state: { user }, actions: { login } } = useAuthContext();
    const navigate = useNavigate();

    if (user) {
        navigate('/');
    }

    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormValues) {
        try {
            await login(data);

            toast.success('Login realizado com sucesso!', 'Você está sendo redirecionado para o dashboard.');

            form.reset();
        } catch (error: any) {
            if (error && error.success === false) {
                toast.error('Ops!', error.message);
                return;
            }

            toast.error('Erro de Conexão', 'Não foi possível contatar o servidor.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-200 px-6 py-10 selection:bg-purple-500/30">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                <div className="flex flex-col gap-8 order-2 lg:order-1">
                    <div className="flex flex-col gap-3 text-center lg:text-left">
                        <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                            <div className="bg-purple-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <ShieldCheck className="text-white w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white italic">
                                FacilitaME
                            </h2>
                        </div>

                        <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
                            Acesse sua <br /> <span className="text-purple-500">Plataforma</span>
                        </h1>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-md w-full mx-auto lg:mx-0">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] ml-1">
                                            E-mail de Acesso
                                        </FormLabel>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-500 transition-colors z-10" />
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="exemplo@dominio.com"
                                                    className="h-14 pl-12 bg-neutral-900 border-neutral-800 rounded-2xl focus-visible:ring-purple-500/20 focus-visible:border-purple-500/50 transition-all text-neutral-200"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-red-500 text-[11px] font-bold ml-1" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <FormLabel className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">
                                                Senha de Acesso
                                            </FormLabel>
                                        </div>

                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-500 transition-colors z-10" />

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="h-14 pl-12 pr-12 bg-neutral-900 border-neutral-800 rounded-2xl focus-visible:ring-purple-500/20 focus-visible:border-purple-500/50 transition-all text-neutral-200"
                                                />
                                            </FormControl>

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-purple-500 transition-colors z-10 p-1"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>

                                        <FormMessage className="text-red-500 text-[11px] font-bold ml-1" />
                                        <div className="flex justify-between items-center px-1">
                                            <Link to="/recuperar-senha" className="text-[10px] font-black uppercase text-purple-500 hover:text-purple-400 transition-colors">
                                                Esqueceu sua senha?
                                            </Link>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="h-14 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98] mt-2 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {form.formState.isSubmitting ? (
                                    "Autenticando..."
                                ) : (
                                    <>
                                        Entrar no Painel <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0">

                        <Link to="/cadastro">
                            <p className="text-center lg:text-left text-[10px] font-black uppercase text-neutral-500 tracking-widest">
                                Ainda não tem uma conta? <span className="text-purple-500 cursor-pointer hover:underline">Faça seu Cadastro</span>
                            </p>
                        </Link>
                    </div>
                </div>

                <div className="lg:flex order-1 lg:order-2 justify-center items-center relative py-10 lg:py-0">
                    <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full" />

                    <div className="relative group">
                        <div className="relative bg-neutral-900 border border-neutral-800 p-12 lg:p-24 rounded-[4.5rem] shadow-3xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-rotate-1">

                            <Fingerprint className="w-24 h-24 lg:w-32 lg:h-32 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-700" />

                            <div className="absolute -top-8 -right-4 bg-neutral-800 border border-neutral-700 p-5 rounded-[2.5rem] shadow-2xl flex items-center gap-3 transition-transform group-hover:translate-y-[-5px]">
                                <div className="bg-purple-500/20 p-2.5 rounded-xl">
                                    <Sparkles className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex flex-col pr-2">
                                    <p className="text-[9px] font-black text-white uppercase tracking-tighter">Grupo Seleto</p>
                                    <p className="text-[11px] font-bold text-neutral-400 italic leading-none mt-1">Bem-vindo à elite</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-12 -left-8 bg-neutral-800 border border-neutral-800 p-6 rounded-[2.5rem] shadow-2xl rotate-[-8deg] flex flex-col gap-3 transition-all group-hover:rotate-0 group-hover:border-purple-500/30 duration-500">
                                <div className="space-y-2">
                                    <p className="text-[11px] text-neutral-400 leading-tight font-medium">
                                        Você agora faz parte dos <br />
                                        <span className="text-white font-bold">3% que sabem cobrar.</span>
                                    </p>
                                    <div className="flex gap-1">
                                        <div className="w-8 h-1 bg-purple-500 rounded-full" />
                                        <div className="w-16 h-1 bg-neutral-800 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-4 left-1/2 w-10 h-10 bg-purple-500/10 rotate-45 rounded-md blur-sm animate-pulse" />
                            <div className="absolute -bottom-4 right-1/2 w-8 h-8 bg-purple-500/10 -rotate-45 rounded-md blur-sm animate-pulse" />

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}