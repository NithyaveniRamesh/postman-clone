import re


def resolve_variables(text: str | None, variables: dict):

    if not text:
        return text

    pattern = r"\{\{(.*?)\}\}"

    def replace(match):
        key = match.group(1).strip()
        return str(
            variables.get(
                key,
                match.group(0),
            )
        )

    return re.sub(
        pattern,
        replace,
        text,
    )