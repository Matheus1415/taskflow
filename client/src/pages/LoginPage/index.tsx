import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Lock, Mail, ArrowRight, Fingerprint,
  EyeOff, Eye, CheckSquare, LayoutDashboard
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { useAuthContext } from "@/contexts/AuthContext/hook";
import { toast } from "@/utils/notifications";

// Schema de validação
export const loginSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório." })
    .email("Informe um e-mail válido."),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { actions: { login } } = useAuthContext();
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
    } catch (error: any) {

      if (error && error.success === false) {
        toast.error('Ops!', error.message);
      } else {
        toast.error('Erro de Conexão', 'Não foi possível contatar o servidor.');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-200 px-6 py-10 selection:bg-blue-500/30 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
              <div className="bg-blue-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <CheckSquare className="text-white w-6 h-6" />
              </div>
              <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white italic">
                TaskFlow
              </h2>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
              Domine sua <br /> <span className="text-blue-500">Produtividade</span>
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
                      Identificação (E-mail)
                    </FormLabel>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10" />
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@acesso.com"
                          className="h-11 pl-12 bg-neutral-900 border-neutral-800 rounded-2xl focus-visible:ring-blue-500/20 focus-visible:border-blue-500/50 transition-all text-neutral-200 placeholder:text-neutral-700"
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
                        Chave de Segurança
                      </FormLabel>
                    </div>

                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-blue-500 transition-colors z-10" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 pl-12 pr-12 bg-neutral-900 border-neutral-800 rounded-2xl focus-visible:ring-blue-500/20 focus-visible:border-blue-500/50 transition-all text-neutral-200 placeholder:text-neutral-700"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-blue-500 transition-colors z-10 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <FormMessage className="text-red-500 text-[11px] font-bold ml-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-2 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting ? (
                  "Validando..."
                ) : (
                  <>
                    Acessar TaskFlow <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:flex order-1 lg:order-2 justify-center items-center relative py-10 lg:py-0">
          <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />

          <div className="relative group transition-all duration-700 ease-out hover:scale-[1.03] hover:-rotate-2">

            <div className="relative bg-neutral-900 border border-neutral-800 p-12 lg:p-24 rounded-[4rem] shadow-2xl overflow-hidden">

              <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

              <Fingerprint className="relative w-24 h-24 lg:w-32 lg:h-32 text-blue-500/20 group-hover:text-blue-500/40 transition-all duration-1000 ease-in-out z-10" />

              <div className="absolute top-1/4 right-10 w-1 h-1 bg-blue-500/40 rounded-full blur-sm group-hover:animate-ping" />
              <div className="absolute bottom-1/4 left-10 w-1 h-1 bg-blue-600/40 rounded-full blur-sm group-hover:animate-ping delay-300" />
            </div>

            <div className="absolute -top-6 -right-6 bg-neutral-800 border border-neutral-700 p-4 rounded-[2rem] shadow-2xl flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:translate-x-2 z-20">
              <div className="bg-blue-500/20 p-2 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <LayoutDashboard className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex flex-col pr-2">
                <p className="text-[9px] font-black text-white uppercase tracking-tighter leading-none">Fluxo Ativo</p>
                <p className="text-[10px] font-bold text-neutral-400 italic leading-none mt-1">Alta Performance</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-10 bg-neutral-800 border border-neutral-700 p-6 rounded-[2.5rem] shadow-2xl -rotate-6 flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-2 group-hover:translate-y-2 z-20 w-max">
              <div className="space-y-2">
                <p className="text-[11px] text-neutral-400 leading-tight font-medium">
                  Você está entrando nos <br />
                  <span className="text-white font-bold italic uppercase tracking-tighter">3% que dominam o tempo.</span>
                </p>
                <div className="flex gap-1 items-center">
                  <div className="w-12 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <div className="w-2 h-1 bg-neutral-700 rounded-full" />
                  <div className="w-8 h-1 bg-neutral-700 rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
