from collections.abc import Sequence

SUBGENRES: dict[str, Sequence[str]] = {
    "classics": [],
    "slasher": ["slasher", "slasher film"],
    "psychological": ["psychological horror", "psychological thriller"],
    "found-footage": ["found footage", "found footage film"],
    "paranormal": ["paranormal", "paranormal horror"],
    "gore": ["gore", "splatter"],
}


def normalize_subgenre(value: str) -> str:
    return value.strip().lower().replace("_", "-")


def get_keywords(subgenre: str) -> Sequence[str] | None:
    normalized = normalize_subgenre(subgenre)
    return SUBGENRES.get(normalized)