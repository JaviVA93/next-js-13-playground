'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from '../styles/pokemonList.module.css';

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<[{ name: string, url: string }] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageNumbers, setPageNumbers] = useState<number[] | []>([]);

    const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
        const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000');
        const reqData = await req.json();
        return reqData.results;
    }

    const cleanSelectedPageLi = (parent: Element) => {
        parent.querySelectorAll('li[selected]').forEach(e => {
            e.removeAttribute('selected');
        });
    }

    const clickChangePage = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.parentElement instanceof Element) cleanSelectedPageLi(event.target.parentElement)
        event.target.setAttribute('selected', '');
        setCurrentPage(Number(event.target.id))
    }

    const pokemonsPerPage = 50;
    const renderPageNumbers =
        <ul className={styles.pagination}>
            {currentPage !== 1 ? <li>Back</li> : ''}
            {pageNumbers?.map(num => {
                return <li key={num.toString()} id={num.toString()} onClick={clickChangePage}>
                    {num}
                </li>
            })}
            {currentPage !== pageNumbers.length ? <li>Next</li> : ''}
        </ul>

    const renderPokemonList = pokemonList.length > 0 ? pokemonList?.slice(currentPage - 1, (currentPage - 1) + pokemonsPerPage).map(p => {
        return (
            <li key={p.url}>
                <Link href={`/pokemons/${p.url.split('/')[6]}`}>
                    <span>{p.name}</span>
                </Link>
            </li>
        )
    }) : <span>Loading pokemons...</span>


    useEffect(() => {
        getPokemonsList().then(pl => {
            const aux = [];
            for (let i = 1; i <= Math.ceil(pl.length / pokemonsPerPage); i++) {
                aux.push(i);
            }
            console.log(aux.length)
            setPageNumbers(aux);
            setPokemonList(pl);
        });
    }, []);


    return (
        <ul>
            {!pokemonList ?
                'Loading...'
                :
                <div>
                    <div>
                        {renderPageNumbers}
                    </div>
                    <ul className={styles.pokemonList}>
                        {renderPokemonList}
                    </ul>
                </div>
            }
        </ul>
    )
}