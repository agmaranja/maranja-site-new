import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

const CallMeForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
    servicos: [] as string[]
  });

  const servicosList = [
    "Criação de Sites com IA",
    "Automação de Agendamentos 24h com Agentes de I.A",
    "Relatórios Inteligentes de Conversas",
    "Pacote de Conteúdo para Redes Sociais",
    "Gestão de CRM e Follow-Up Inteligente",
    "Monitoramento de Reputação Online",
    "Pacote de Tráfego Local Inteligente",
    "Otimização de Presença Google (SEO Local)"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      servicos: checked 
        ? [...prev.servicos, service]
        : prev.servicos.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Dados do formulário sendo enviados:", formData);
      
      // Send form data to Supabase edge function to email recipients
      const { data, error } = await supabase.functions.invoke("send-contact-form", {
        body: {
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          mensagem: formData.mensagem,
          servicos: formData.servicos,
          recipients: [
            "agmaranja@gmail.com", 
            "bmeduneckas@gmail.com", 
            "denermelo2@gmail.com"
          ]
        }
      });

      if (error) {
        console.error("Erro na Edge Function:", error);
        throw error;
      }

      console.log("Resposta completa da Edge Function:", data);

      toast({
        title: "Formulário enviado!",
        description: "Entraremos em contato em breve.",
        duration: 5000
      });

      // Limpar formulário
      setFormData({
        nome: "",
        telefone: "",
        email: "",
        mensagem: "",
        servicos: []
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return <section id="ligue-para-mim" className="py-20 md:py-28 bg-gradient-to-b from-maranja-beige to-maranja-cream relative">
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-maranja-darkblue mb-5">
              Vamos conversar?
            </h2>
            <p className="text-maranja-darkblue/70 max-w-xl mx-auto">
              Preencha seus dados que ligamos para você e explicamos como podemos ajudar sua clínica a crescer com mais tranquilidade.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 md:p-10 relative">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 mb-8">
                <div className="grid gap-3">
                  <Label htmlFor="nome" className="text-maranja-darkblue">
                    Nome
                  </Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome completo" required className="border-maranja-darkblue/20 focus:border-maranja-darkblue focus:ring-maranja-darkblue" />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="telefone" className="text-maranja-darkblue">
                    Telefone
                  </Label>
                  <Input id="telefone" name="telefone" type="tel" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" required className="border-maranja-darkblue/20 focus:border-maranja-darkblue focus:ring-maranja-darkblue" />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-maranja-darkblue">
                    E-mail
                  </Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required className="border-maranja-darkblue/20 focus:border-maranja-darkblue focus:ring-maranja-darkblue" />
                </div>

                <div className="grid gap-3">
                  <Label className="text-maranja-darkblue">
                    Quais serviços você tem interesse? (opcional)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicosList.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={formData.servicos.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                          className="border-maranja-darkblue/20 data-[state=checked]:bg-maranja-darkblue data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-maranja-darkblue/80"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="mensagem" className="text-maranja-darkblue">
                    Mensagem (opcional)
                  </Label>
                  <Textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} placeholder="Como podemos ajudar a sua clínica?" className="min-h-[120px] border-maranja-darkblue/20 focus:border-maranja-darkblue focus:ring-maranja-darkblue" />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-maranja-darkblue hover:bg-maranja-darkblue/90 text-white" disabled={loading}>
                {loading ? "Enviando..." : "Solicitar contato"}
              </Button>
            </form>
            
            <div className="mt-10 pt-8 border-t border-maranja-darkblue/10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-2 text-maranja-darkblue">
                  <Phone className="h-5 w-5" />
                  <span>(11) 98240-4879</span>
                </div>
                <div className="flex items-center gap-2 text-maranja-darkblue">
                  <Mail className="h-5 w-5" />
                  <span>agmaranja@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default CallMeForm;
