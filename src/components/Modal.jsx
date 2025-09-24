export function Modal({ isOpen, moves, onClose }) {
    if (!isOpen) return null;

    return (
        <section className="w-screen h-screen fixed top-0 z-50 bg-neutral-900 bg-opacity-95 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-md max-h-full p-5">
                <div className="relative bg-neutral-100 dark:bg-neutral-700 rounded-lg shadow">
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-neutral-900 dark:text-neutral-200">
                            Parabéns ! <br />
                            Você terminou o jogo com {Number(moves)} movimentos.
                        </h3>

                        <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => window.location.reload()}>
                            Novo Jogo
                        </button>

                        <button type="button" className="text-neutral-800 bg-neutral-300 hover:bg-neutral-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-neutral-800 dark:text-gray-300 dark:hover:text-white dark:hover:bg-neutral-900 dark:focus:ring-neutral-900" onClick={() => window.location.reload()}>Fechar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}