const useGenre = (selectedGeneres) => {

    if (selectedGeneres.length < 1) return "";
    const GenreIds = selectedGeneres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);

};

export default useGenre;
