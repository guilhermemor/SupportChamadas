import './SingIn.css';
import logo from '../../assets/logo.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);

    async function handleSignIn(event) {
    event.preventDefault();
    
    if (email.length < 5 || password.length < 5) {
        setError('Senha muito Curta');
    } else {
        try {
            setError(''); // Limpa o erro anterior
            await signIn(email, password);
            setError('Senha Incorreta'); // Define a mensagem de erro padrão caso o login não retorne erro
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('E-mail não cadastrado');
            } else if (error.code === 'auth/wrong-password') {
                setError('Senha Incorreta');
            }
        }
    }
}


    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="logo do sistema de chamados" />
                </div>
                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro, se existir */}
                    <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>
                <Link to="/register">Criar conta</Link>
            </div>
        </div>
    );
}

export default SingIn;
