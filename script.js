

"use strict";

// Catálogo inicial. Receitas adicionais podem ser
// inseridas neste mesmo formato após validação.
const receitas = [
  {
    id: 1, nome: "Kit de Armadura Leve", nivel: 1,
    materiais: [["Couro Leve", 1]]
  },
  {
    id: 2, nome: "Botas de Couro Costuradas à Mão",
    nivel: 1,
    materiais: [["Couro Leve", 2], ["Linha Grossa", 1]]
  },
  {
    id: 3, nome: "Capa de Couro Costurada à Mão",
    nivel: 1,
    materiais: [["Couro Leve", 2], ["Linha Grossa", 1]]
  },
  {
    id: 4, nome: "Colete de Couro Costurado à Mão",
    nivel: 1,
    materiais: [["Couro Leve", 3], ["Linha Grossa", 1]]
  },
  {
    id: 5, nome: "Calças de Couro Costuradas à Mão",
    nivel: 15,
    materiais: [["Couro Leve", 4], ["Linha Grossa", 1]]
  },
  {
    id: 6, nome: "Luvas de Couro Fino", nivel: 50,
    materiais: [
      ["Pelego Leve Curado", 1],
      ["Couro Leve", 4],
      ["Linha Grossa", 2]
    ]
  },
  {
    id: 7, nome: "Luvas Bárbaras", nivel: 125,
    materiais: [
      ["Couro Pesado", 6],
      ["Presa Grande", 2],
      ["Linha Fina", 1]
    ]
  },
  {
    id: 8, nome: "Perneiras Bárbaras", nivel: 145,
    materiais: [
      ["Couro Pesado", 10],
      ["Linha Fina", 2],
      ["Ágata Musgosa", 1]
    ]
  },
  {
    id: 9, nome: "Capa do Grande Vodu", nivel: 215,
    materiais: [
      ["Couro Grosso", 14],
      ["Frasco de Mojo Grande", 4],
      ["Linha de Seda Grossa", 2]
    ]
  },
  {
    id: 10, nome: "Perneiras Vulcânicas", nivel: 245,
    materiais: [
      ["Couro Rústico", 6],
      ["Essência do Fogo", 1],
      ["Núcleo da Terra", 1],
      ["Linha Rúnica", 1]
    ]
  }
];

const CHAVE = "wowForeverCouroariaV1";

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || {};
  } catch {
    return {};
  }
}

const salvo = carregar();

const estado = {
  nivel: salvo.nivel ?? 75,
  producao: Array.isArray(salvo.producao)
    ? salvo.producao : [],
  estoque: salvo.estoque || {},
  precos: salvo.precos || {}
};

function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(estado));
}

const $ = id => document.getElementById(id);

function numero(valor) {
  return Math.max(0, Math.floor(Number(valor) || 0));
}

function textoSeguro(valor) {
  return String(valor).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

function moeda(cobre) {
  cobre = numero(cobre);
  const ouro = Math.floor(cobre / 10000);
  const prata = Math.floor((cobre % 10000) / 100);
  const resto = cobre % 100;
  return `${ouro}o ${prata}p ${resto}c`;
}

function receitaPorId(id) {
  return receitas.find(r => r.id === Number(id));
}

function materiaisTotais() {
  const totais = {};

  for (const item of estado.producao) {
    const receita = receitaPorId(item.id);
    if (!receita) continue;

    for (const [nome, quantidade] of receita.materiais) {
      totais[nome] = (totais[nome] || 0)
        + quantidade * item.quantidade;
    }
  }

  return totais;
}

function atualizarNivel() {
  estado.nivel = Math.max(
    1, Math.min(300, numero($("nivel").value))
  );
  $("nivel").value = estado.nivel;
  $("nivelTexto").textContent = `${estado.nivel} / 300`;
  $("progresso").style.width =
    `${estado.nivel / 300 * 100}%`;
  salvar();
  renderizarReceitas();
}

function renderizarReceitas() {
  const busca = $("busca").value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const mostrarTodas = $("mostrarTodas").checked;

  const filtradas = receitas.filter(r => {
    const nome = r.nome.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return nome.includes(busca) &&
      (mostrarTodas || r.nivel <= estado.nivel);
  });

  $("contador").textContent =
    `${filtradas.length} receitas encontradas`;

  $("catalogo").innerHTML = filtradas.map(r => {
    const bloqueada = r.nivel > estado.nivel;
    const ingredientes = r.materiais.map(
      ([nome, qtd]) => `${qtd}x ${textoSeguro(nome)}`
    ).join("<br>");

    return `
      <article class="receita ${bloqueada ? "bloqueada" : ""}">
        <h3>${textoSeguro(r.nome)}</h3>
        <p>Requer Couroaria ${r.nivel}</p>
        <div class="ingredientes">${ingredientes}</div>
        <div class="controles">
          <input type="number" min="1" value="1"
                 id="qtd-${r.id}" aria-label="Quantidade">
          <button class="botao pequeno"
                  data-adicionar="${r.id}">
            + Adicionar
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function adicionarReceita(id) {
  const receita = receitaPorId(id);
  if (!receita) return;

  const quantidade = Math.max(
    1, numero($(`qtd-${id}`).value)
  );

  const existente = estado.producao.find(
    item => item.id === id
  );

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    estado.producao.push({ id, quantidade });
  }

  salvar();
  renderizarProducao();
  renderizarMateriais();
}

function alterarQuantidade(id, diferenca) {
  const item = estado.producao.find(x => x.id === id);
  if (!item) return;

  item.quantidade += diferenca;

  if (item.quantidade <= 0) {
    estado.producao = estado.producao.filter(
      x => x.id !== id
    );
  }

  salvar();
  renderizarProducao();
  renderizarMateriais();
}

function removerReceita(id) {
  estado.producao = estado.producao.filter(
    x => x.id !== id
  );
  salvar();
  renderizarProducao();
  renderizarMateriais();
}

function renderizarProducao() {
  const total = estado.producao.reduce(
    (s, item) => s + item.quantidade, 0
  );

  $("totalItens").textContent = `${total} itens`;

  $("listaProducao").innerHTML =
    estado.producao.length === 0
      ? "<p class='secundario'>Nenhuma receita adicionada.</p>"
      : estado.producao.map(item => {
        const r = receitaPorId(item.id);
        if (!r) return "";

        return `
          <div class="item">
            <h3>${textoSeguro(r.nome)}</h3>
            <div class="controles">
              <button class="botao pequeno"
                      data-menos="${r.id}">−</button>
              <strong>${item.quantidade}</strong>
              <button class="botao pequeno"
                      data-mais="${r.id}">+</button>
              <button class="botao perigo pequeno"
                      data-remover="${r.id}">
                Remover
              </button>
            </div>
          </div>
        `;
      }).join("");
}

function renderizarMateriais() {
  const totais = materiaisTotais();
  const entradas = Object.entries(totais)
    .sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));

  $("listaMateriais").innerHTML =
    entradas.length === 0
      ? "<p class='secundario'>Adicione receitas primeiro.</p>"
      : entradas.map(([nome, quantidade], indice) => {
        const tenho = numero(estado.estoque[nome]);
        const falta = Math.max(0, quantidade - tenho);
        const preco = estado.precos[nome] || {};
        const seguro = textoSeguro(nome);

        return `
          <div class="material" data-material="${indice}">
            <h3>${seguro}</h3>
            <p>Necessário: <strong>${quantidade}</strong></p>
            <p>Falta obter: <strong>${falta}</strong></p>
            <div class="campos">
              <div class="campo">
                <label>Já tenho</label>
                <input type="number" min="0"
                  data-campo="estoque"
                  data-nome="${seguro}"
                  value="${tenho}">
              </div>
              ${["ouro", "prata", "cobre"].map(campo => `
                <div class="campo">
                  <label>${campo}</label>
                  <input type="number" min="0"
                    data-campo="${campo}"
                    data-nome="${seguro}"
                    value="${numero(preco[campo])}">
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }).join("");

  let custoFaltante = 0;
  let custoTotal = 0;

  for (const [nome, quantidade] of entradas) {
    const p = estado.precos[nome] || {};
    const unitario =
      numero(p.ouro) * 10000 +
      numero(p.prata) * 100 +
      numero(p.cobre);

    custoTotal += quantidade * unitario;
    custoFaltante += Math.max(
      0, quantidade - numero(estado.estoque[nome])
    ) * unitario;
  }

  $("custoFaltante").textContent = moeda(custoFaltante);
  $("custoTotal").textContent = moeda(custoTotal);
}

function copiarLista() {
  const totais = materiaisTotais();

  const linhas = [
    "COUROARIA — WOW FOREVER",
    "",
    "ITENS PARA FABRICAR:",
    ...estado.producao.map(item => {
      const r = receitaPorId(item.id);
      return `${item.quantidade}x ${r?.nome || "Receita"}`;
    }),
    "",
    "MATERIAIS NECESSÁRIOS:",
    ...Object.entries(totais).map(([nome, qtd]) => {
      const falta = Math.max(
        0, qtd - numero(estado.estoque[nome])
      );
      return `${nome}: ${qtd} no total | faltam ${falta}`;
    }),
    "",
    `CUSTO A COMPRAR: ${$("custoFaltante").textContent}`
  ];

  navigator.clipboard.writeText(linhas.join("\n"))
    .then(() => alert("Lista copiada!"))
    .catch(() => alert("Não foi possível copiar."));
}

document.querySelectorAll(".aba").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".aba").forEach(
      b => b.classList.remove("ativa")
    );
    document.querySelectorAll(".pagina").forEach(
      p => p.classList.remove("ativa")
    );

    botao.classList.add("ativa");
    $(botao.dataset.aba).classList.add("ativa");
  });
});

$("catalogo").addEventListener("click", e => {
  const botao = e.target.closest("[data-adicionar]");
  if (botao) adicionarReceita(Number(botao.dataset.adicionar));
});

$("listaProducao").addEventListener("click", e => {
  const botao = e.target.closest("button");
  if (!botao) return;

  if (botao.dataset.mais)
    alterarQuantidade(Number(botao.dataset.mais), 1);
  if (botao.dataset.menos)
    alterarQuantidade(Number(botao.dataset.menos), -1);
  if (botao.dataset.remover)
    removerReceita(Number(botao.dataset.remover));
});

$("listaMateriais").addEventListener("change", e => {
  const input = e.target.closest("[data-campo]");
  if (!input) return;

  const nome = input.dataset.nome;
  const campo = input.dataset.campo;
  const valor = numero(input.value);

  if (campo === "estoque") {
    estado.estoque[nome] = valor;
  } else {
    if (!estado.precos[nome]) estado.precos[nome] = {};
    estado.precos[nome][campo] = valor;
  }

  salvar();
  renderizarMateriais();
});

$("nivel").addEventListener("change", atualizarNivel);
$("busca").addEventListener("input", renderizarReceitas);
$("mostrarTodas").addEventListener(
  "change", renderizarReceitas
);

$("limpar").addEventListener("click", () => {
  if (!confirm("Deseja limpar toda a produção?")) return;
  estado.producao = [];
  salvar();
  renderizarProducao();
  renderizarMateriais();
});

$("copiar").addEventListener("click", copiarLista);

$("nivel").value = estado.nivel;
atualizarNivel();
renderizarProducao();
renderizarMateriais();
