import React, { useState } from 'react';
import './Item.css';

const Item = ({ item }) => {
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSendName = async () => {
        try {
            let backendUrl;
            const { hostname, href } = window.location;
            if (hostname.endsWith('.github.dev')) {
                backendUrl = href.replace(/-\d+\.app\.github\.dev/, '-5000.app.github.dev').replace(/(https?:\/\/[^/]+).*/, '$1');
            } else {
                backendUrl = 'http://localhost:5000';
            }
            const response = await fetch(`${backendUrl}/api/item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: item.name }),
            });
            const data = await response.json();
            setPrice(data.price ?? 'Indisponível');
        } catch (error) {
            setPrice('Erro');
        }
    };

    return (
        <div className="item-box">
            <h2 className="item-title">{item.name}</h2>
            {!imageUrl && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="item-btn"
                    style={{ display: 'block', margin: '8px 0' }}
                />
            )}
            {imageUrl && (
                <>
                    <img src={imageUrl} alt="Item" style={{maxWidth: 120, marginBottom: 12}} />
                    <a
                        href={imageUrl}
                        download={image ? image.name : 'imagem-item'}
                        className="item-btn"
                        style={{ display: 'block', margin: '8px 0' }}
                    >
                        Baixar imagem
                    </a>
                </>
            )}
            <div className="item-price">
                {price === '' ? <span className="price-placeholder">Preço: --</span> : <span>Preço: R$ {price}</span>}
            </div>
            <button className="item-btn" onClick={handleSendName}>Pesquisar preço</button>
        </div>
    );
};

export default Item;