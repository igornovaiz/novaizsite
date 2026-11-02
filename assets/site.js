// Borda no topo ao rolar e revelação das seções ao entrarem na tela.
const topo = document.getElementById("topo");
const marcarTopo = () => topo.classList.toggle("rolou", window.scrollY > 8);
marcarTopo();
window.addEventListener("scroll", marcarTopo, { passive: true });

const itens = document.querySelectorAll(".revela");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  itens.forEach((el) => obs.observe(el));
} else {
  itens.forEach((el) => el.classList.add("visivel"));
}
