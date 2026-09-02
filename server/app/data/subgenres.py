from collections.abc import Sequence

SUBGENRES: dict[str, Sequence[str]] = {
    "classics": [],
    "slasher": ["slasher"],
    "psychological": ["psychological horror"],
    "found-footage": ["found footage"],
    "paranormal": ["paranormal"],
    "gore": ["gore"],
}


def normalize_subgenre(value: str) -> str:
    return value.strip().lower().replace("_", "-")


def get_keywords(subgenre: str) -> Sequence[str] | None:
    normalized = normalize_subgenre(subgenre)
    return SUBGENRES.get(normalized)