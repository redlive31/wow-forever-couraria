
"use strict";

// Catálogo de Couroaria — WoW Forever
// Nomes traduzidos para português.
// Nível = habilidade mínima para fabricar.
// As receitas podem ser revisadas conforme o jogo.

const receitas = [
  {
    id: 1,
    nome: "Couro Leve",
    nivel: 1,
    materiais: [["Retalhos de Couro Arruinado", 3]]
  },
  {
    id: 2,
    nome: "Kit de Armadura Leve",
    nivel: 1,
    materiais: [["Couro Leve", 1]]
  },
  {
    id: 3,
    nome: "Botas de Couro Costuradas à Mão",
    nivel: 1,
    materiais: [
      ["Couro Leve", 2],
      ["Linha Grossa", 1]
    ]
  },
  {
    id: 4,
    nome: "Colete de Couro Costurado à Mão",
    nivel: 1,
    materiais: [
      ["Couro Leve", 3],
      ["Linha Grossa", 1]
    ]
  },
  {
    id: 5,
    nome: "Capa de Couro Costurada à Mão",
    nivel: 1,
    materiais: [
      ["Couro Leve", 2],
      ["Linha Grossa", 1]
    ]
  },
  {
    id: 6,
    nome: "Braçadeiras de Couro Costuradas à Mão",
    nivel: 1,
    materiais: [
      ["Couro Leve", 2],
      ["Linha Grossa", 3]
    ]
  },
  {
    id: 7,
    nome: "Calças de Couro Costuradas à Mão",
    nivel: 15,
    materiais: [
      ["Couro Leve", 4],
      ["Linha Grossa", 1]
    ]
  },
  {
    id: 8,
    nome: "Barraca de Acampamento",
    nivel: 20,
    materiais: [["Couro Leve", 5]]
  },
  {
    id: 9,
    nome: "Cinto de Couro Costurado à Mão",
    nivel: 25,
    materiais: [
      ["Couro Leve", 6],
      ["Linha Grossa", 1]
    ]
  },
  {
    id: 10,
    nome: "Aljava de Couro Leve",
    nivel: 25,
    materiais: [
      ["Couro Leve", 4],
      ["Linha Grossa", 2]
    ]
  },
  {
    id: 11,
    nome: "Bolsa Pequena de Munição de Couro",
    nivel: 25,
    materiais: [
      ["Couro Leve", 3],
      ["Linha Grossa", 4]
    ]
  },
  {
    id: 12,
    nome: "Pelego Leve Curado",
    nivel: 30,
    materiais: [
      ["Pelego Leve", 1],
      ["Sal", 1]
    ]
  },
  {
    id: 13,
    nome: "Bolsa de Reagentes de Couro Leve",
    nivel: 30,
    materiais: [
      ["Couro Leve", 8],
      ["Pelego Leve Curado", 1],
      ["Linha Grossa", 3]
    ]
  },
  {
    id: 14,
    nome: "Calças de Couro Rústico",
    nivel: 30,
    materiais: [
      ["Couro Leve", 5],
      ["Linha Grossa", 5]
    ]
  },
  {
    id: 15,
    nome: "Botas de Couro Escuro",
    nivel: 35,
    materiais: [
      ["Couro Leve", 24],
      ["Pelego Leve Curado", 2],
      ["Tintura Cinza", 1]
    ]
  },
  {
    id: 16,
    nome: "Pantufas de Dragonete Negro",
    nivel: 35,
    materiais: [
      ["Couro Leve", 12],
      ["Pelego Leve Curado", 2],
      ["Escama de Dragonete Negro", 2]
    ]
  },
  {
    id: 17,
    nome: "Cinto de Couro do Cavaleiro da Tempestade",
    nivel: 60,
    materiais: [
      ["Couro Leve", 10],
      ["Pelego Leve Curado", 2],
      ["Couro Imaculado", 2],
      ["Linha Grossa", 1],
      ["Tintura Cerúlea", 1]
    ]
  },
  {
    id: 18,
    nome: "Botas de Couro do Cavaleiro da Tempestade",
    nivel: 85,
    materiais: [
      ["Couro Leve", 14],
      ["Pelego Leve Curado", 4],
      ["Couro Imaculado", 3],
      ["Linha Fina", 1],
      ["Tintura Cerúlea", 3]
    ]
  },
  {
    id: 19,
    nome: "Capa de Couro Escuro",
    nivel: 85,
    materiais: [
      ["Couro Médio", 8],
      ["Linha Fina", 1],
      ["Tintura Cinza", 1]
    ]
  },
  {
    id: 20,
    nome: "Calças de Couro Escuro",
    nivel: 90,
    materiais: [
      ["Couro Médio", 12],
      ["Tintura Cinza", 1],
      ["Linha Fina", 1]
    ]
  },
  {
    id: 21,
    nome: "Luvas de Couro Ágeis",
    nivel: 95,
    materiais: [
      ["Elixir de Agilidade Menor", 1],
      ["Couro Médio", 6],
      ["Linha Fina", 1]
    ]
  },
  {
    id: 22,
    nome: "Ombreiras Bárbaras",
    nivel: 150,
    materiais: [
      ["Couro Pesado", 8],
      ["Pelego Pesado Curado", 1],
      ["Linha Fina", 2]
    ]
  },
  {
    id: 23,
    nome: "Armadura de Couro Crepuscular",
    nivel: 150,
    materiais: [
      ["Couro Pesado", 10],
      ["Óleo de Sombra", 1],
      ["Linha Fina", 2]
    ]
  },
  {
    id: 24,
    nome: "Braçadeiras de Couro Verde",
    nivel: 155,
    materiais: [
      ["Pelego Pesado Curado", 2],
      ["Couro Pesado", 6],
      ["Tintura Verde", 1],
      ["Linha Fina", 1]
    ]
  },
  {
    id: 25,
    nome: "Botas de Couro Noturno",
    nivel: 230,
    materiais: [
      ["Couro Grosso", 16],
      ["Linha de Seda Grossa", 2]
    ]
  },
  {
    id: 26,
    nome: "Calças de Couro Noturno",
    nivel: 225,
    materiais: [
      ["Couro Grosso", 14],
      ["Linha de Seda", 4]
    ]
  },
  {
    id: 27,
    nome: "Elmo de Escama de Tartaruga",
    nivel: 225,
    materiais: [
      ["Couro Grosso", 14],
      ["Escama de Tartaruga", 24],
      ["Linha de Seda Grossa", 1]
    ]
  },
  {
    id: 28,
    nome: "Perneiras de Escama de Tartaruga",
    nivel: 230,
    materiais: [
      ["Couro Grosso", 14],
      ["Escama de Tartaruga", 28],
      ["Linha de Seda Grossa", 1]
    ]
  },
  {
    id: 29,
    nome: "Botas do Cão do Núcleo",
    nivel: 295,
    materiais: [
      ["Couro do Núcleo", 20],
      ["Núcleo Ígneo", 6],
      ["Núcleo de Lava", 2],
      ["Linha Rúnica", 2]
    ]
  },
  {
    id: 30,
    nome: "Kit de Armadura do Núcleo",
    nivel: 300,
    materiais: [
      ["Couro do Núcleo", 3],
      ["Linha Rúnica", 2]
    ]
  },
  {
    id: 31,
    nome: "Botas de Escama de Dragão Negro",
    nivel: 300,
    materiais: [
      ["Couro Encantado", 6],
      ["Escama de Dragão Negro", 30],
      ["Núcleo Ígneo", 4],
      ["Núcleo de Lava", 3],
      ["Linha Rúnica", 2]
    ]
  },
  {
    id: 32,
    nome: "Elmo Derretido",
    nivel: 300,
    materiais: [
      ["Couro do Núcleo", 15],
      ["Núcleo Ígneo", 3],
      ["Núcleo de Lava", 6],
      ["Linha Rúnica", 2]
    ]
  }
];
