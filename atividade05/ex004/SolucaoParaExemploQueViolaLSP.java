interface Voador {
    void voar();
}

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

class Aviao extends Veiculo implements Voador {
    @Override
    public void voar() {
        System.out.println("Avião voando em altitudes elevadas.");
    }
}

// A interface Voador é introduzida, e a classe Aviao implementa essa interface. Isso permite que a hierarquia seja mais específica sobre quais veículos podem voar, evitando a violação do LSP em contextos onde a capacidade de voar é esperada.
