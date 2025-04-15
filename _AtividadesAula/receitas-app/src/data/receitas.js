let receitas = [
  {
    id: 1,
    titulo: 'Bolo de Chocolate',
    categoria: 'Sobremesas',
    tempoPreparo: '1 hora',
    imagem: 'https://img.freepik.com/fotos-gratis/delicioso-bolo-de-chocolate-com-cobertura_23-2149217327.jpg',
    ingredientes: [
      '2 xícaras de farinha de trigo',
      '1 xícara de açúcar',
      '1 xícara de chocolate em pó',
      '1 colher de sopa de fermento',
      '2 ovos',
      '1 xícara de leite',
    ],
    modoPreparo: [
      'Pré-aqueça o forno a 180°C',
      'Misture os ingredientes secos em uma tigela',
      'Adicione os ovos e o leite, misturando bem',
      'Despeje a massa em uma forma untada',
      'Asse por 40 minutos ou até que um palito saia limpo',
    ],
    favorito: true,
  },
  {
    id: 2,
    titulo: 'Penne ao Molho Rosa',
    categoria: 'Massas',
    tempoPreparo: '30 minutos',
    imagem: 'https://img.freepik.com/fotos-gratis/penne-com-molho-de-tomate-e-manjericao_2829-19744.jpg',
    ingredientes: [
      '500g de penne',
      '2 xícaras de molho de tomate',
      '1/2 xícara de creme de leite',
      '1 cebola picada',
      '2 dentes de alho',
      'Sal e pimenta a gosto',
    ],
    modoPreparo: [
      'Cozinhe o penne conforme as instruções da embalagem',
      'Refogue a cebola e o alho em azeite',
      'Adicione o molho de tomate e deixe cozinhar por 10 minutos',
      'Acrescente o creme de leite e temperos',
      'Misture o molho com a massa cozida',
    ],
    favorito: false,
  },
  {
    id: 3,
    titulo: 'Filé Mignon com Molho Madeira',
    categoria: 'Carnes',
    tempoPreparo: '45 minutos',
    imagem: 'https://img.freepik.com/fotos-gratis/fatias-de-carne-grelhada-com-molho_2829-18625.jpg',
    ingredientes: [
      '4 filés mignon',
      '1 xícara de vinho madeira',
      '1 colher de sopa de manteiga',
      '1 colher de sopa de farinha de trigo',
      '1 xícara de caldo de carne',
      'Sal e pimenta a gosto',
    ],
    modoPreparo: [
      'Tempere os filés com sal e pimenta',
      'Grelhe os filés em uma frigideira quente',
      'Na mesma frigideira, derreta a manteiga e doure a farinha',
      'Adicione o vinho e o caldo, mexendo até engrossar',
      'Volte os filés ao molho por 2 minutos antes de servir',
    ],
    favorito: true,
  },
  {
    id: 4,
    titulo: 'Risoto de Cogumelos',
    categoria: 'Vegetarianas',
    tempoPreparo: '40 minutos',
    imagem: 'https://img.freepik.com/fotos-gratis/risoto-de-cogumelos_1203-3474.jpg',
    ingredientes: [
      '1 xícara de arroz arbóreo',
      '200g de cogumelos variados',
      '1 cebola picada',
      '1/2 xícara de vinho branco',
      '4 xícaras de caldo de legumes',
      '2 colheres de sopa de queijo parmesão ralado',
    ],
    modoPreparo: [
      'Refogue a cebola em azeite até ficar transparente',
      'Adicione os cogumelos e cozinhe por 5 minutos',
      'Acrescente o arroz e toste por 2 minutos',
      'Deglace com vinho branco e vá adicionando o caldo aos poucos',
      'Quando o arroz estiver al dente, misture o parmesão',
    ],
    favorito: false,
  },
  {
    id: 5,
    titulo: 'Salada Caesar',
    categoria: 'Saladas',
    tempoPreparo: '15 minutos',
    imagem: 'https://img.freepik.com/fotos-gratis/salada-caesar-com-frango-e-croutons_2829-10790.jpg',
    ingredientes: [
      '1 pé de alface romana',
      '1 xícara de croutons',
      '1/2 xícara de queijo parmesão ralado',
      '1 peito de frango grelhado',
      'Molho Caesar a gosto',
    ],
    modoPreparo: [
      'Lave e rasgue as folhas de alface',
      'Corte o frango em tiras',
      'Misture todos os ingredientes em uma tigela grande',
      'Regue com o molho Caesar e sirva imediatamente',
    ],
    favorito: true,
  },
  {
    id: 6,
    titulo: 'Sopa de Abóbora',
    categoria: 'Sopas',
    tempoPreparo: '35 minutos',
    imagem: 'https://img.freepik.com/fotos-gratis/sopa-de-abobora-cremosa_1203-3469.jpg',
    ingredientes: [
      '1 abóbora cabotiá média',
      '1 cebola picada',
      '2 dentes de alho',
      '1 litro de caldo de legumes',
      '1/2 xícara de creme de leite',
      'Sal e noz-moscada a gosto',
    ],
    modoPreparo: [
      'Corte a abóbora em cubos (com casca)',
      'Refogue a cebola e o alho em azeite',
      'Adicione a abóbora e o caldo, cozinhando até ficar macia',
      'Bata no liquidificador até obter um creme',
      'Volte ao fogo, acrescente o creme de leite e temperos',
    ],
    favorito: false,
  },
];

export const categorias = ['Sobremesas', 'Massas', 'Carnes', 'Vegetarianas', 'Saladas', 'Sopas'];

export function getReceitasPorCategoria(categoria) {
  return [...receitas.filter((receita) => receita.categoria === categoria)];
}

export function toggleFavorito(id) {
  receitas = receitas.map(receita => 
    receita.id === id ? {...receita, favorito: !receita.favorito} : receita
  );
  return receitas.find(receita => receita.id === id).favorito;
}

export function receitasFavoritas() {
  return [...receitas.filter((receita) => receita.favorito)];
}

export function getReceitaById(id) {
  return {...receitas.find(receita => receita.id === id)};
}