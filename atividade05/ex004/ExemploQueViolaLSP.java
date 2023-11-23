class Veiculo {
    public void mover() {
        System.out.println("Movendo-se de forma genérica.");
    }
}

class Carro extends Veiculo {
    @Override
    public void mover() {
        System.out.println("Carro se deslocando na estrada.");
    }
}

class Aviao extends Veiculo {
    @Override
    public void mover() {
        System.out.println("Avião voando em altitudes elevadas.");
    }
}

// Neste exemplo, a classe base Veiculo possui um método mover(), e as classes derivadas Carro e Aviao substituem esse método com comportamentos específicos. No entanto, se tentarmos usar essa hierarquia em um contexto onde se espera que todos os veículos possam se mover da mesma maneira, podemos violar o LSP.
