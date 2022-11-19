'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from '../styles/pokemonList.module.css';

export default function PokemonList({ pokemonList }: { pokemonList: any }) {
    // const [pokemonList, setPokemonList] = useState<[{ name: string, url: string }] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const [pageNumbers, setPageNumbers] = useState<number[] | []>([]);
    const pokemonsPerPage = 50;
    const pageNumbers = [];
    const aux = [];
    for (let i = 1; i <= Math.ceil(pokemonList.length / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    

    // const getPokemonsList = async (): Promise<[{ name: string, url: string }]> => {
    //     const req = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000', { next: { revalidate: 60*60*24 } });
    //     const reqData = await req.json();
    //     return reqData.results;
    // }

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

    const renderPageNumbers =
        <ul className={styles.pagination}>
            {currentPage !== 1 ? <li style={{color: 'grey'}}>Back</li> : ''}
            {pageNumbers?.map(num => {
                return <li key={num.toString()} id={num.toString()} onClick={clickChangePage}>
                    {num}
                </li>
            })}
            {currentPage !== pageNumbers.length ? <li style={{color: 'grey'}}>Next</li> : ''}
        </ul>

    const renderPokemonList = pokemonList.length > 0 ? pokemonList.slice((currentPage - 1) * pokemonsPerPage, (currentPage - 1) * pokemonsPerPage + pokemonsPerPage).map( (p: {url: string, name: string}) => {
        return (
            <li key={p.url}>
                <span>{p.name} - </span>
                <Link href={`/pokemons/${p.url.split('/')[6]}`}>
                    <span>Check Stats</span>
                </Link>
            </li>
        )
    }) : <span>Loading pokemons...</span>


    useEffect(() => {
        // getPokemonsList().then(pl => {
        //     console.log(`============================ pokemon list length: ${pl.length}`)
        //     const aux = [];
        //     for (let i = 1; i <= Math.ceil(pl.length / pokemonsPerPage); i++) {
        //         aux.push(i);
        //     }
        //     setPageNumbers(aux);
        //     setPokemonList(pl);
        // });
        // const aux = [];
        // for (let i = 1; i <= Math.ceil(pokemonList.length / pokemonsPerPage); i++) {
        //     aux.push(i);
        // }
        // setPageNumbers(aux);
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