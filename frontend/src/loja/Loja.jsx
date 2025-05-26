import React, { useEffect, useState } from 'react';
import Item from '../item/Item';
import './Loja.css';

const Loja = () => {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const fetchItens = async () => {
            try {
                let backendUrl;
                const { hostname, href } = window.location;
                if (hostname.endsWith('.github.dev')) {
                    backendUrl = href.replace(/-\d+\.app\.github\.dev/, '-5000.app.github.dev').replace(/(https?:\/\/[^/]+).*/, '$1');
                } else {
                    backendUrl = 'http://localhost:5000';
                }
                const response = await fetch(`${backendUrl}/api/items`);
                const data = await response.json();
                setItens(data.items || []);
            } catch (error) {
                setItens([]);
            }
        };
        fetchItens();
    }, []);

    return (
        <div>
            <h1 className="loja-title">Itens Disponíveis</h1>
            <div className="itens-flex">
                {itens.map((item, idx) => (
                    <Item key={idx} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Loja;